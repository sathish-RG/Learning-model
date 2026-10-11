// A tiny API tester (like Postman or curl), built with Node's own http module.
// It sends a real HTTP request to your server and prints what went out and what came back:
//
//   → POST /api/tasks  {"title":"Buy milk"}
//   ← 201 Created  (Content-Type: application/json, Location: /api/tasks/3)
//     {"id":3,"title":"Buy milk","done":false}
//
// request(method, path, { body, raw, headers }) also returns { status, headers, body },
// so test code can use the reply (for example, a login token).
// `body` is sent as JSON; `raw` sends text exactly as written (to test broken JSON).
const http = require("http");

// Headers worth showing: the type of the body, plus the ones these lessons teach
const SHOWN_HEADERS = ["content-type", "location", "allow", "www-authenticate", "retry-after"];
const HIDDEN_HEADERS = ["x-powered-by", "x-content-type-options"];
const isShown = (name) => SHOWN_HEADERS.includes(name) || (name.startsWith("x-") && !HIDDEN_HEADERS.includes(name));
const titleCase = (name) =>
  name === "www-authenticate" ? "WWW-Authenticate" : name.replace(/(^|-)([a-z])/g, (all, dash, letter) => dash + letter.toUpperCase());
const shorten = (text, max = 300) => (text.length > max ? text.slice(0, max) + "…" : text);
const TIMEOUT_MS = 3000;

function request(method, path, { body, raw, headers = {} } = {}) {
  return new Promise((resolve) => {
    let finished = false;
    let timer;
    const finish = (result) => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      resolve(result);
    };
    const data = raw !== undefined ? raw : body === undefined ? undefined : JSON.stringify(body);
    const sent = { ...headers };
    if (data !== undefined) {
      sent["Content-Type"] = "application/json";
      sent["Content-Length"] = Buffer.byteLength(data);
    }

    const extras = Object.entries(headers).map(([name, value]) => `${name}: ${shorten(String(value), 40)}`);
    console.log(`→ ${method} ${path}${extras.length ? `  (${extras.join(", ")})` : ""}${data ? `  ${shorten(data)}` : ""}`);

    const req = http.request({ host: "localhost", port: 3000, path, method, headers: sent }, (res) => {
      let text = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => (text += chunk));
      res.on("end", () => {
        text = text.replace(/<script src="\/__csb_runtime[^"]*"><\/script>\s*/, ""); // added by the sandbox, not by you
        const shown = Object.entries(res.headers)
          .filter(([name]) => isShown(name))
          .map(([name, value]) => `${titleCase(name)}: ${String(value).replace("; charset=utf-8", "")}`);
        console.log(`← ${res.statusCode} ${http.STATUS_CODES[res.statusCode] || ""}${shown.length ? `  (${shown.join(", ")})` : ""}`);
        if (text) console.log(`  ${shorten(text.replace(/\s*\n\s*/g, " "))}`);

        let parsed = text;
        try {
          parsed = JSON.parse(text);
        } catch {
          // not JSON: keep the text
        }
        finish({ status: res.statusCode, headers: res.headers, body: parsed });
      });
    });

    req.on("error", (err) => {
      if (finished) return;
      console.log(`✗ No reply (${err.message}). Is the server listening on port 3000?`);
      finish({ status: 0, headers: {}, body: null });
    });
    // A route that never sends a response leaves the client waiting forever
    timer = setTimeout(() => {
      console.log(`✗ No reply after ${TIMEOUT_MS / 1000} seconds. Does this route always send a response (res.end, res.json…)?`);
      finish({ status: 0, headers: {}, body: null });
      req.destroy();
    }, TIMEOUT_MS);
    if (data !== undefined) req.write(data);
    req.end();
  });
}

module.exports = { request };
