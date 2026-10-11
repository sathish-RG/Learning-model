// Sandpack's Node sandbox always starts index.js, so this hidden file starts the lesson's
// code for you, the way you would type `node server.js` in a terminal. It also:
// - checks your files for typos first, with a clearer message than the sandbox gives;
// - shows the error in the preview if your server crashes before it starts listening;
// - keeps the sandbox alive, so your next edit can restart it.
const fs = require("fs");
const http = require("http");
const path = require("path");

const report = (err) => console.error(err && err.stack ? err.stack : String(err));
process.on("uncaughtException", report);
process.on("unhandledRejection", report);

const findSyntaxError = () => {
  for (const file of CONFIG.check) {
    try {
      new Function("require", "module", "exports", "__filename", "__dirname", fs.readFileSync(path.join(__dirname, file), "utf8"));
    } catch (err) {
      if (err instanceof SyntaxError) return `SyntaxError in ${file}: ${err.message}`;
    }
  }
  return null;
};

// Server lessons: if the server can't start, the preview explains why instead of loading forever
const showProblem = (problem) => {
  if (!CONFIG.server) return;
  http
    .createServer((req, res) => {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end(`Your server didn't start:\n\n${problem}\n\nFix it in the editor and it restarts on its own.`);
    })
    .listen(3000);
};

console.log(`$ node ${[CONFIG.entry, ...CONFIG.args].map((arg) => (arg.includes(" ") ? `"${arg}"` : arg)).join(" ")}`);
process.argv = [process.argv[0], path.join(__dirname, CONFIG.entry), ...CONFIG.args];

const syntaxError = findSyntaxError();
if (syntaxError) {
  console.error(syntaxError);
  console.error("Look for a missing bracket, quote or comma near there.");
  showProblem(syntaxError);
} else {
  try {
    require(`./${CONFIG.entry}`);
  } catch (err) {
    report(err);
    showProblem(err && err.stack ? err.stack : String(err));
  }
}

setInterval(() => {}, 1 << 30);
