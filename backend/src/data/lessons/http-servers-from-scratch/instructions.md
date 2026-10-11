## Your mission: a restaurant API with plain Node

Build it in `server.js`, using only the built-in `http` module. `requests.js` (locked) is your test drive: after the server starts, it sends 6 requests and prints each reply in the console. Until a route is written, its request shows `✗ No reply`.

1. **A helper.** Write `sendJson(res, status, data, headers = {})`. It calls `res.writeHead(status, { "Content-Type": "application/json", ...headers })`, then `res.end(JSON.stringify(data))`.
2. **The home page.** `GET /` → status `200`, header `Content-Type: text/html; charset=utf-8`, and an HTML body with an `<h1>` `Welcome to the Kitchen` (it appears in the preview).
3. **The menu.** `GET /api/menu` → `200` with the `menu` array as JSON. (Type `/api/menu` in the preview's address bar too!)
4. **Place an order.** `POST /api/orders` → read the body (collect the chunks, then parse on `"end"`):
   - not valid JSON → `400` with `{ "error": "Body must be valid JSON" }`
   - no dish with that `dishId` → `400` with `{ "error": "No dish with id N" }`
   - otherwise → `201`, with a `Location: /api/orders/ID` header, and the order as JSON: `{ id, dish, quantity, total }` (`quantity` is `1` if it's missing; `total` is price × quantity; the first order's `id` is `1`)
5. **Wrong method.** Any other method on `/api/menu` → `405` with an `Allow: GET` header and `{ "error": "Method not allowed" }`.
6. **Everything else.** → `404` with `{ "error": "Not found" }`.

Remember to `return` after answering, so a request never gets two answers.

✅ **You're done when** the preview shows your welcome page, and the test drive's replies are, in order:

```
← 200 OK  (Content-Type: application/json)
← 201 Created  (Content-Type: application/json, Location: /api/orders/1)
← 400 Bad Request  (Content-Type: application/json)
← 400 Bad Request  (Content-Type: application/json)
← 405 Method Not Allowed  (Content-Type: application/json, Allow: GET)
← 404 Not Found  (Content-Type: application/json)
```

with the right bodies under each (for example `{"id":1,"dish":"Masala dosa","quantity":2,"total":240}`).
