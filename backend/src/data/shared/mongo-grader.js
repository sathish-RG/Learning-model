// Runs each function exported by queries.js (q1, q2...) against a fresh copy of the practice
// database (data.js), prints what it returns, and checks it against the expected answer.
// Write queries are checked by what's in the collections afterwards.
// answers.js (hidden) holds the expected answers, and optional index checks.
const { createDb } = require("./mongo");
const { printDocuments, score, heading, pass, fail, summary } = require("./grader-utils");
const data = require("./data");
const answers = require("./answers");

let mine;
try {
  mine = require("./queries");
} catch (error) {
  console.error(`queries.js has an error: ${error.message}`);
  mine = {};
}

// The same JSON whatever order the fields were written in
const canonical = (value) =>
  JSON.stringify(value, (key, v) => (v && typeof v === "object" && !Array.isArray(v) ? Object.fromEntries(Object.entries(v).sort(([a], [b]) => a.localeCompare(b))) : v));

// Accept a cursor too (a forgotten .toArray()), and async functions
const settle = async (value) => {
  const result = await value;
  return result && typeof result.toArray === "function" ? result.toArray() : result;
};

// What a write changed in a collection: new or changed documents, and removed ones
function printChanges(collection, after) {
  const before = new Map((data[collection] || []).map((doc) => [canonical(doc._id), canonical(doc)]));
  const changed = after.filter((doc) => before.get(canonical(doc._id)) !== canonical(doc));
  const kept = new Set(after.map((doc) => canonical(doc._id)));
  const removed = [...before.keys()].filter((id) => !kept.has(id));
  if (!changed.length && !removed.length) return console.log(`Nothing changed in ${collection}.`);
  if (changed.length) {
    console.log(`New or changed in ${collection}:`);
    printDocuments(changed);
  }
  if (removed.length) console.log(`Removed from ${collection}: _id ${removed.join(", ")}`);
}

async function runQuery(fn) {
  const { db, collections } = createDb(data);
  const result = await settle(fn(db));
  return { result, collections };
}

// Did the learner's index list contain one that serves this query? (equality → sort → range)
function servesQuery(keys, check) {
  const fields = Object.keys(keys);
  const equality = fields.slice(0, check.equality.length);
  if (equality.some((field) => !check.equality.includes(field)) || equality.length !== check.equality.length) return false;
  const sortFields = Object.entries(check.sort || {});
  const rest = fields.slice(check.equality.length, check.equality.length + sortFields.length);
  if (rest.length !== sortFields.length || rest.some((field, i) => field !== sortFields[i][0])) return false;
  if (sortFields.length) {
    const same = sortFields.every(([field, dir]) => keys[field] === dir);
    const reversed = sortFields.every(([field, dir]) => keys[field] === -dir);
    if (!same && !reversed) return false;
  }
  if (check.range) return fields[check.equality.length + sortFields.length] === check.range;
  return true;
}

(async () => {
  for (const [name, answer] of Object.entries(answers.queries)) {
    score.total++;
    heading(`${name}: ${answer.title}`);
    if (typeof mine[name] !== "function") {
      fail(`Not written yet: export a function, e.g. exports.${name} = (db) => db.collection.find(...).toArray();`);
      continue;
    }
    let got;
    try {
      got = await runQuery(mine[name]);
    } catch (error) {
      fail(`Error: ${error.message}`);
      continue;
    }
    const expected = await runQuery(answer.run);

    if (answer.writes) {
      console.log(`Returned: ${JSON.stringify(got.result)}`);
      for (const collection of answer.writes) printChanges(collection, got.collections[collection] || []);
      const same = answer.writes.every((c) => canonical(got.collections[c]) === canonical(expected.collections[c]));
      if (same) pass("Correct!");
      else fail("Not yet: the collection doesn't look as expected afterwards. Check the filter and the update.");
      continue;
    }

    printDocuments(got.result);
    if (canonical(got.result) === canonical(expected.result)) {
      pass("Correct!");
    } else if (Array.isArray(expected.result) && (!Array.isArray(got.result) || got.result.length !== expected.result.length)) {
      fail(`Not yet: expected ${expected.result.length} document${expected.result.length === 1 ? "" : "s"}, got ${Array.isArray(got.result) ? got.result.length : "something else"}.`);
    } else if (Array.isArray(expected.result)) {
      const i = got.result.findIndex((doc, n) => canonical(doc) !== canonical(expected.result[n]));
      fail(`Not yet: document ${i + 1} should be ${JSON.stringify(expected.result[i])} (check the fields and the sorting).`);
    } else {
      fail(`Not yet: expected ${JSON.stringify(expected.result)}.`);
    }
  }

  if (answers.indexChecks) {
    const { db, indexes } = createDb(data);
    try {
      if (typeof mine.createIndexes === "function") await mine.createIndexes(db);
    } catch (error) {
      console.error(`createIndexes failed: ${error.message}`);
    }
    for (const check of answers.indexChecks) {
      score.total++;
      heading(`Index for: ${check.title}`);
      const list = indexes[check.collection] || [];
      const used = list.find((keys) => servesQuery(keys, check));
      if (used) pass(`Uses the index ${JSON.stringify(used)} (IXSCAN: jumps straight to the right documents)`);
      else fail(`No index fits, so MongoDB reads every document in ${check.collection} (COLLSCAN). ${check.hint}`);
    }
  }

  summary(answers.indexChecks ? "checks" : "queries");
})();
