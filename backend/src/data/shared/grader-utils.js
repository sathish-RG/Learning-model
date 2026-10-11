// Shared by the database lessons' graders: prints results as text tables and keeps the score.
const MAX_ROWS = 12;
const MAX_CELL = 40;

const cellText = (value) => {
  if (value === null || value === undefined) return "NULL";
  const text = typeof value === "object" ? JSON.stringify(value) : String(value);
  return text.length > MAX_CELL ? text.slice(0, MAX_CELL - 1) + "…" : text;
};

// printTable(["id", "title"], [[1, "Dune"], ...]) draws a box like the sqlite3 or psql tools
function printTable(columns, rows) {
  const shown = rows.slice(0, MAX_ROWS).map((row) => row.map(cellText));
  const widths = columns.map((column, i) => Math.max(String(column).length, ...shown.map((row) => row[i].length)));
  const line = (left, middle, right) => left + widths.map((w) => "─".repeat(w + 2)).join(middle) + right;
  const row = (cells) => "│" + cells.map((cell, i) => ` ${String(cell).padEnd(widths[i])} `).join("│") + "│";
  console.log(line("┌", "┬", "┐"));
  console.log(row(columns));
  console.log(line("├", "┼", "┤"));
  shown.forEach((cells) => console.log(row(cells)));
  console.log(line("└", "┴", "┘"));
  const more = rows.length - shown.length;
  console.log(`(${rows.length} row${rows.length === 1 ? "" : "s"}${more > 0 ? `, ${more} not shown` : ""})`);
}

// Documents (MongoDB lessons): one table, with a column for every field that appears
function printDocuments(docs) {
  if (!Array.isArray(docs)) return console.log(`  ${JSON.stringify(docs)}`);
  if (docs.length === 0) return console.log("(no documents)");
  if (docs.some((doc) => doc === null || typeof doc !== "object" || Array.isArray(doc))) {
    return docs.forEach((doc) => console.log(`  ${JSON.stringify(doc)}`));
  }
  const columns = [...new Set(docs.flatMap((doc) => Object.keys(doc)))];
  printTable(columns, docs.map((doc) => columns.map((column) => (column in doc ? doc[column] : ""))));
}

const score = { correct: 0, total: 0 };
const heading = (text) => console.log(`\n── ${text} ──`);
const pass = (text) => {
  score.correct++;
  console.log(`✅ ${text}`);
};
const fail = (text) => console.error(`❌ ${text}`);
const summary = (what) => {
  console.log("");
  if (score.correct === score.total) console.log(`🎉 All ${score.total} ${what} correct!`);
  else console.log(`Score: ${score.correct} / ${score.total} ${what} correct`);
};

module.exports = { printTable, printDocuments, score, heading, pass, fail, summary };
