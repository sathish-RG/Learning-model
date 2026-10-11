// Runs every sample in samples.js through your Book model with validateSync(): real Mongoose,
// just without a database (validation happens before anything is saved anyway).
const { score, heading, pass, fail, summary } = require("./grader-utils");
const samples = require("./samples");
const expected = require("./expected");

let Book;
try {
  Book = require("./bookSchema");
} catch (error) {
  console.error(`bookSchema.js has an error: ${error.message}`);
}

if (!Book || typeof Book !== "function" || !Book.schema) {
  console.error('Export your model: module.exports = mongoose.model("Book", bookSchema);');
} else {
  samples.forEach(({ label, doc }, i) => {
    score.total++;
    heading(`Sample ${i + 1}: ${label}`);
    const want = expected[label];
    const book = new Book(doc);
    const error = book.validateSync();
    const got = error ? Object.fromEntries(Object.entries(error.errors).map(([path, e]) => [path, e.message])) : {};

    if (!error) {
      const saved = book.toObject();
      delete saved._id;
      console.log(`✔ Valid. It would be saved as: ${JSON.stringify(saved)}`);
    } else {
      console.log("✘ Invalid:");
      Object.entries(got).forEach(([path, message]) => console.log(`   ${path}: ${message}`));
    }

    const problems = [];
    for (const [path, message] of Object.entries(want.errors)) {
      if (!(path in got)) problems.push(`${path} should be rejected ("${message}")`);
      else if (got[path] !== message) problems.push(`${path}'s message should be "${message}"`);
    }
    for (const path of Object.keys(got)) {
      if (!(path in want.errors)) problems.push(`${path} should be allowed here`);
    }
    for (const [path, value] of Object.entries(want.values || {})) {
      if (book.get(path) !== value) problems.push(`${path} should end up as ${JSON.stringify(value)}, not ${JSON.stringify(book.get(path))}`);
    }
    for (const path of want.absent || []) {
      if (book.toObject()[path] !== undefined) problems.push(`${path} isn't in the schema, so it shouldn't be kept`);
    }

    if (problems.length) fail(`Not yet: ${problems.join("; ")}.`);
    else pass("Correct!");
  });
  summary("samples");
}
