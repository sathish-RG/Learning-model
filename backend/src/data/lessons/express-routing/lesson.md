## Why does this matter?

Your plain `http` server worked, but think about what a real app needs: dozens of routes, URLs with IDs in them (`/api/menu/2`), search options (`?category=drinks`)… With plain `http`, that's a wall of `if` statements and string handling. **Express** is the most popular Node framework, and it turns all of that into short, readable lines.

## Express is the receptionist 🛎️

Picture the front desk of a big hotel. Visitors arrive all day with different requests. The **receptionist** looks at each one ("a GET for `/api/menu/2`? That's room service, second door on the left"), sends them to the right person, and handles the paperwork.

That's Express:

- it reads the method and URL of each request, and sends it to the matching **route handler** (the right person);
- it does the paperwork: turning objects into JSON, setting `Content-Type`, picking out the parts of the URL for you.

Same route, both ways:

```js
// Plain http
if (req.method === "GET" && req.url === "/api/menu") {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(menu));
  return;
}

// Express
app.get("/api/menu", (req, res) => {
  res.json(menu); // status 200, Content-Type: application/json, and JSON.stringify: all done
});
```

## Getting started 🚀

```js
const express = require("express"); // npm install express

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hello!</h1>"); // a string: sent as HTML
});

app.listen(3000, () => console.log("Listening on http://localhost:3000"));
```

There's a method for every HTTP method: `app.get`, `app.post`, `app.put`, `app.patch`, `app.delete`. Each takes a **path** and a **handler** `(req, res) => { ... }`.

| Response helper | What it does |
|---|---|
| `res.json(data)` | Sends `data` as JSON (with the right `Content-Type`) |
| `res.send(text)` | Sends text or HTML |
| `res.status(404)` | Sets the status code. **Chain it:** `res.status(404).json({ error: "Not found" })` |
| `res.type("html")` | Sets `Content-Type` (`"html"`, `"json"`, `"text"`…) |
| `res.set(name, value)` | Sets any header |

## URL parameters: the ID in the URL 🔢

Put a `:name` in the path, and Express hands you that part of the URL in `req.params`:

```js
app.get("/api/menu/:id", (req, res) => {
  console.log(req.params.id);       // GET /api/menu/2  →  "2"   (TEXT, not a number!)
  const dish = menu.find((d) => d.id === Number(req.params.id));

  if (!dish) {
    return res.status(404).json({ error: `No dish with id ${req.params.id}` });
  }
  res.json(dish);
});
```

The `return` matters: it stops the function, so you never try to send a second response.

## Query strings: optional extras ❓

Everything after the `?` in a URL is the **query string**: optional settings, like filters. Express puts it in `req.query`:

```js
// GET /api/menu?category=drinks&maxPrice=100
app.get("/api/menu", (req, res) => {
  console.log(req.query); // { category: "drinks", maxPrice: "100" }   (all text again!)

  let dishes = menu;
  if (req.query.category) {
    dishes = dishes.filter((d) => d.category === req.query.category);
  }
  res.json(dishes);
});
```

| | URL parameter | Query string |
|---|---|---|
| Looks like | `/api/menu/2` | `/api/menu?category=drinks` |
| Read with | `req.params.id` | `req.query.category` |
| Use it for | **Which** thing (required) | **How** to show it: filter, sort, page (optional) |
| If it's missing | A different route | Same route, no filter |

An empty result is still a success: `?category=pizza` answers `200` with `[]`, not `404`. **404** means "that URL doesn't exist", as with `/api/menu/42`.

## Route order: first match wins 🥇

Express checks routes **from top to bottom**, and the first one that matches handles the request. That causes a classic bug:

```js
app.get("/api/menu/:id", ...);      // ❌ "specials" matches :id, so this runs...
app.get("/api/menu/specials", ...); // ...and this is never reached
```

`/api/menu/specials` matches `/api/menu/:id` (with `id = "specials"`), so you'd get "No dish with id specials". **Put specific routes before the general ones**: `/specials` first, then `/:id`.

## Remember ✅

- Express sends each request to the first route whose **method and path** match, top to bottom.
- `res.json()` does the JSON paperwork; `res.status(code)` chains before it.
- `req.params` = the parts of the path (`/:id`), `req.query` = what comes after `?`. Both are **text**.
- An empty list is `200`; a URL that doesn't exist is `404`.
- Specific routes (`/specials`) go **before** general ones (`/:id`).
