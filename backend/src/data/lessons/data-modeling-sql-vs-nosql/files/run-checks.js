// Checks both blog designs: schema.sql in a real SQLite database (sql.js), and the documents
// in documents.js with MongoDB-style queries (mingo).
const fs = require("fs");
const path = require("path");
const initSqlJs = require("sql.js");
const mingo = require("mingo");
const { printTable, printDocuments, score, heading, pass, fail, summary } = require("./grader-utils");

// One check: fn returns true (pass), or a string explaining what's wrong
function check(title, fn) {
  score.total++;
  heading(title);
  try {
    const result = fn();
    if (result === true) pass("Correct!");
    else fail(`Not yet: ${result}`);
  } catch (error) {
    fail(`Not yet: ${error.message}`);
  }
}

// Does running this SQL fail (as a constraint should make it)?
const fails = (db, sql) => {
  try {
    db.run(sql);
    return false;
  } catch {
    return true;
  }
};

initSqlJs().then((SQL) => {
  console.log("PART 1: the tables (schema.sql)");
  const db = new SQL.Database();
  db.run("PRAGMA foreign_keys = ON;");
  let created = true;
  try {
    db.run(fs.readFileSync(path.join(__dirname, "schema.sql"), "utf8"));
  } catch (error) {
    created = false;
    console.error(`schema.sql has an error: ${error.message}`);
  }

  const columns = (table) => {
    const result = db.exec(`PRAGMA table_info(${table})`);
    return result.length ? result[0].values.map((row) => row[1]) : [];
  };
  const hasColumns = (table, wanted) => {
    const found = columns(table);
    if (!found.length) return `there's no ${table} table yet.`;
    const missing = wanted.filter((c) => !found.includes(c));
    return missing.length ? `${table} is missing: ${missing.join(", ")} (it has: ${found.join(", ")}).` : true;
  };

  check("users: id, name, email (unique, required)", () => {
    if (!created) return "fix schema.sql first.";
    const shape = hasColumns("users", ["id", "name", "email"]);
    if (shape !== true) return shape;
    db.run("INSERT INTO users (id, name, email) VALUES (1, 'Asha', 'asha@example.com'), (2, 'Ravi', 'ravi@example.com')");
    if (!fails(db, "INSERT INTO users (id, name, email) VALUES (3, 'Copy', 'asha@example.com')")) return "two users could share an email. Add UNIQUE.";
    if (!fails(db, "INSERT INTO users (id, email) VALUES (4, 'noname@example.com')")) return "a user could have no name. Add NOT NULL.";
    return true;
  });

  check("posts: id, user_id (→ users), title, body", () => {
    const shape = hasColumns("posts", ["id", "user_id", "title", "body"]);
    if (shape !== true) return shape;
    db.run("INSERT INTO posts (id, user_id, title, body) VALUES (1, 1, 'Hello MongoDB', 'Documents are like folders.'), (2, 2, 'SQL vs NoSQL', 'Pick the right tool.')");
    if (!fails(db, "INSERT INTO posts (id, user_id, title, body) VALUES (3, 99, 'Ghost', 'No such user')")) return "a post could belong to user 99, who doesn't exist. Add REFERENCES users(id).";
    if (!fails(db, "INSERT INTO posts (id, user_id, body) VALUES (4, 1, 'No title')")) return "a post could have no title. Add NOT NULL.";
    return true;
  });

  check("comments: id, post_id (→ posts), user_id (→ users), text", () => {
    const shape = hasColumns("comments", ["id", "post_id", "user_id", "text"]);
    if (shape !== true) return shape;
    db.run("INSERT INTO comments (id, post_id, user_id, text) VALUES (1, 1, 2, 'Great intro!'), (2, 1, 1, 'Thanks Ravi!')");
    if (!fails(db, "INSERT INTO comments (id, post_id, user_id, text) VALUES (3, 42, 1, 'Lost')")) return "a comment could belong to post 42, which doesn't exist. Add REFERENCES posts(id).";
    if (!fails(db, "INSERT INTO comments (id, post_id, user_id, text) VALUES (4, 1, 77, 'Who?')")) return "a comment could be written by user 77, who doesn't exist. Add REFERENCES users(id).";
    return true;
  });

  check("Putting it back together with JOINs", () => {
    const result = db.exec(`
      SELECT p.title, u.name AS commenter, c.text
      FROM comments c
      JOIN posts p ON c.post_id = p.id
      JOIN users u ON c.user_id = u.id
      ORDER BY c.id`);
    if (!result.length) return "the join found no comments.";
    printTable(result[0].columns, result[0].values);
    return result[0].values.length === 2 || "expected 2 comments.";
  });

  console.log("\nPART 2: the documents (documents.js)");
  let docs = {};
  try {
    docs = require("./documents");
  } catch (error) {
    console.error(`documents.js has an error: ${error.message}`);
  }
  const users = Array.isArray(docs.users) ? docs.users : [];
  const posts = Array.isArray(docs.posts) ? docs.posts : [];
  const userIds = users.map((u) => u._id);

  check("users: Asha (_id 1) and Ravi (_id 2)", () => {
    if (users.length !== 2) return `export a users array with 2 documents (found ${users.length}).`;
    const ok = mingo.find(users, { $or: [{ _id: 1, name: "Asha", email: "asha@example.com" }, { _id: 2, name: "Ravi", email: "ravi@example.com" }] }).all().length === 2;
    return ok || "expected { _id: 1, name: \"Asha\", email: \"asha@example.com\" } and { _id: 2, name: \"Ravi\", email: \"ravi@example.com\" }.";
  });

  check("posts reference their author (authorId), instead of copying the user", () => {
    if (posts.length !== 2) return `export a posts array with 2 documents (found ${posts.length}).`;
    if (posts.some((p) => p.author !== undefined)) return "a post contains an `author` object. Store only the author's _id, as authorId.";
    const bad = posts.find((p) => !userIds.includes(p.authorId));
    if (bad) return `"${bad.title}" has authorId ${JSON.stringify(bad.authorId)}, which isn't a user's _id.`;
    const hello = posts.find((p) => p.title === "Hello MongoDB");
    if (!hello || hello.authorId !== 1) return "\"Hello MongoDB\" should have authorId 1 (Asha).";
    return true;
  });

  check("comments are embedded inside their post", () => {
    const hello = posts.find((p) => p.title === "Hello MongoDB");
    const sql = posts.find((p) => p.title === "SQL vs NoSQL");
    if (!hello || !sql) return "expected two posts, titled \"Hello MongoDB\" and \"SQL vs NoSQL\".";
    if (!Array.isArray(hello.comments) || hello.comments.length !== 2) return "\"Hello MongoDB\" should have a comments array with 2 comments.";
    if (!Array.isArray(sql.comments) || sql.comments.length !== 0) return "\"SQL vs NoSQL\" should have an empty comments array.";
    const bad = hello.comments.find((c) => !userIds.includes(c.userId) || typeof c.text !== "string");
    if (bad) return `each comment needs a userId (a user's _id) and a text. Check ${JSON.stringify(bad)}.`;
    if (!Array.isArray(hello.tags) || !hello.tags.includes("mongodb")) return "\"Hello MongoDB\" should have tags: [\"mongodb\", \"beginners\"].";
    return true;
  });

  check("Querying the documents", () => {
    console.log('Posts Ravi (userId 2) commented on: db.posts.find({ "comments.userId": 2 })');
    const commented = mingo.find(posts, { "comments.userId": 2 }, { title: 1, _id: 0 }).all();
    printDocuments(commented);
    console.log("Posts with their author, joined at read time with $lookup:");
    const joined = mingo.aggregate(posts, [
      { $lookup: { from: users, localField: "authorId", foreignField: "_id", as: "author" } },
      { $project: { _id: 0, title: 1, author: { $first: "$author.name" }, comments: { $size: "$comments" } } },
    ]);
    printDocuments(joined);
    return (commented.length === 1 && commented[0].title === "Hello MongoDB") || "expected Ravi's comment to be found on \"Hello MongoDB\".";
  });

  summary("checks");
});
