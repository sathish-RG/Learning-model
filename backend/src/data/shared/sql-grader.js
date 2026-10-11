// Runs the queries in queries.sql against a real SQLite database (sql.js: SQLite compiled to
// WebAssembly), prints each result as a table and checks it against the expected answer.
//
// queries.sql is split into numbered blocks, each starting with a comment like
//   -- 3. The five most expensive books
// Every block runs on a fresh copy of the database, so one query can't break the next.
const fs = require("fs");
const path = require("path");
const initSqlJs = require("sql.js");
const { printTable, score, heading, pass, fail, summary } = require("./grader-utils");

const read = (file) => fs.readFileSync(path.join(__dirname, file), "utf8");

// { number: { title, sql } } from a file of "-- N. Title" blocks (other comments are ignored)
function parseBlocks(text) {
  const blocks = {};
  let current = null;
  for (const line of text.split(/\r?\n/)) {
    const header = /^--\s*(\d+)\.\s*(.*)$/.exec(line.trim());
    if (header) {
      current = blocks[header[1]] = { title: header[2].trim(), sql: "" };
    } else if (current && !line.trim().startsWith("--")) {
      current.sql += line + "\n";
    }
  }
  return blocks;
}

const sameRows = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const rowText = (row) => `(${row.map((v) => (typeof v === "string" ? `"${v}"` : String(v))).join(", ")})`;

initSqlJs().then((SQL) => {
  const schema = read("database.sql");
  const fresh = () => {
    const db = new SQL.Database();
    db.run("PRAGMA foreign_keys = ON;");
    db.run(schema);
    return db;
  };
  // The last result of a block (a block may hold several statements)
  const run = (sql) => {
    const db = fresh();
    try {
      const results = db.exec(sql);
      const last = results[results.length - 1];
      return last ? { columns: last.columns, rows: last.values } : { columns: [], rows: [] };
    } finally {
      db.close();
    }
  };

  const answers = parseBlocks(read("answers.sql"));
  const mine = parseBlocks(read("queries.sql"));

  for (const [number, answer] of Object.entries(answers)) {
    score.total++;
    heading(`Query ${number}: ${answer.title}`);
    const sql = mine[number] ? mine[number].sql.trim() : "";
    if (!sql) {
      fail("Not written yet: write your SQL under this query's comment.");
      continue;
    }
    let result;
    try {
      result = run(sql);
    } catch (error) {
      fail(`SQL error: ${error.message}`);
      continue;
    }
    const expected = run(answer.sql);
    if (result.columns.length) printTable(result.columns, result.rows);
    else console.log("(no rows)");

    if (sameRows(result.rows, expected.rows)) {
      pass("Correct!");
    } else if (result.rows.length !== expected.rows.length) {
      fail(`Not yet: expected ${expected.rows.length} row${expected.rows.length === 1 ? "" : "s"}, got ${result.rows.length}.`);
    } else {
      const i = result.rows.findIndex((row, n) => !sameRows(row, expected.rows[n]));
      fail(`Not yet: row ${i + 1} should be ${rowText(expected.rows[i])} (check the columns, their order and the sorting).`);
    }
  }
  summary("queries");
});
