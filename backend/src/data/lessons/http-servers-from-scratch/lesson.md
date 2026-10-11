## Why does this matter?

Every time a browser loads a page, or React calls `fetch`, it sends an **HTTP request** and waits for an **HTTP response**. A server is just a program that listens for requests and answers them. Before using Express (next lesson), you'll build one with Node's built-in **`http`** module, so you understand exactly what Express does for you.

## The waiter's order slip 🧾

In our restaurant, the **waiter** (the API) carries a slip to the kitchen, and brings back a tray. Both have the same three parts:

| | Request (the order slip) 📝 | Response (the tray) 🍛 |
|---|---|---|
| **First line** | **Method** + **URL**: `POST /api/orders` | **Status code**: `201 Created` |
| **Headers** | Notes about the order: `Content-Type: application/json` | Notes about the food: `Content-Type: application/json` |
| **Body** | The order itself: `{"dishId":1,"quantity":2}` | The food itself: `{"id":1,"total":240}` |

The **method** says what the guest wants to do:

| Method | Means | Example |
|---|---|---|
| `GET` | Read something | Show me the menu |
| `POST` | Create something new | Place an order |
| `PUT` / `PATCH` | Change something | Change my order |
| `DELETE` | Remove something | Cancel my order |

## Status codes: how did it go? 🚦

The status code is a 3-digit number, and the **first digit** tells you the family:

| Family | Meaning | The codes you'll use most |
|---|---|---|
| **2xx** ✅ | Success | `200 OK` · `201 Created` (something new was made) · `204 No Content` (done, nothing to send back) |
| **3xx** ↪️ | Look elsewhere | `301 Moved Permanently` · `304 Not Modified` |
| **4xx** 🙋 | **The client** made a mistake | `400 Bad Request` (invalid data) · `401 Unauthorized` (who are you?) · `403 Forbidden` (you can't) · `404 Not Found` · `405 Method Not Allowed` · `409 Conflict` |
| **5xx** 🔥 | **The server** broke | `500 Internal Server Error` · `503 Service Unavailable` |

Choosing the right code matters: the frontend (and tools, and other developers) decide what to do from the code **before** they even read the body. A failed order answered with `200 OK` is a lie!

## Headers: the notes on the slip 🏷️

Headers are `Name: value` pairs. The most important ones:

| Header | Sent by | Means |
|---|---|---|
| `Content-Type` | both | What kind of body this is: `text/html; charset=utf-8`, `application/json`… |
| `Location` | server | After `201 Created`: the URL of the new thing (`/api/orders/1`) |
| `Allow` | server | After `405`: the methods that **are** allowed (`GET`) |
| `Authorization` | client | Proof of who you are (Lesson 60) |

Without the right `Content-Type`, the browser doesn't know if your body is a page to draw or data to read.

## A server in 10 lines 🖥️

```js
const http = require("http");

const server = http.createServer((req, res) => {
  // This function runs for EVERY request
  console.log(req.method, req.url);     // e.g. GET /api/menu

  res.statusCode = 200;                 // 1. the status code
  res.setHeader("Content-Type", "text/plain; charset=utf-8"); // 2. the headers
  res.end("Hello from the kitchen!");   // 3. the body, and "send it now"
});

server.listen(3000, () => console.log("Listening on http://localhost:3000"));
```

- **`localhost`** means "this computer", and **3000** is the **port**: like a door number, so several servers can run on one computer.
- **Every** request must end with `res.end(...)`. Forget it, and the browser waits... and waits.
- You can also set the status and headers in one go: `res.writeHead(201, { "Content-Type": "application/json" })`.

## Routing by hand 🧭

With plain `http`, you check the method and URL yourself:

```js
if (req.method === "GET" && req.url === "/api/menu") {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(menu));  // a body is always TEXT, so stringify objects
  return;                         // stop here: this request is answered
}
```

## Reading a request body 📥

The body of a request is a **stream** (Lesson 55!): it arrives in chunks. Collect them, then parse once it has all arrived:

```js
let body = "";
req.on("data", (chunk) => (body += chunk));
req.on("end", () => {
  try {
    const order = JSON.parse(body);
    // ...use the order...
  } catch {
    // Not valid JSON: that's the client's mistake → 400 Bad Request
  }
});
```

## Testing your server in this sandbox 🧪

- The **preview** is a mini-browser pointed at your server. Browsers can only send `GET` from an address bar, so type paths like `/api/menu` there.
- To test **every** method, each lesson has a locked **`requests.js`**: a test drive that sends real requests to your server (like the tools Postman or curl), and prints what went out `→` and what came back `←`, with the status code, the key headers and the body.
- Edit your code and pause: the server **restarts by itself** after a moment, and the test drive runs again.

## Remember ✅

- A request has a **method**, a **URL**, **headers** and maybe a **body**. A response has a **status code**, **headers** and a **body**.
- 2xx = success, 4xx = the client's mistake, 5xx = the server's mistake. Pick the honest one.
- Always set `Content-Type`, and always finish with `res.end()`.
- `201 Created` comes with a `Location` header; `405 Method Not Allowed` comes with an `Allow` header.
- A request body is a stream: collect the chunks, then `JSON.parse` (and answer `400` if it fails).
