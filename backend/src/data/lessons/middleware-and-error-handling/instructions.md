## Your mission: put security checkpoints on an orders API

In `server.js`, the routes are already written. Your job is the middleware around them. Add each piece in the spot its comment marks: **order matters!**

1. **A logger.** Write `logger(req, res, next)` and add it for every request, **first**. When the response finishes, it prints `METHOD URL → STATUS (Nms)`, e.g. `GET /api/orders → 200 (2ms)` (use `req.originalUrl`).
2. **Read JSON bodies.** Right after the logger, add Express's built-in `express.json()` middleware for every request.
3. **Validation.** Write `validateOrder` and add it to the `POST /api/orders` route only. Collect every problem in a `details` array:
   - `item` must be a non-empty string → `"item is required"`
   - `quantity` must be a whole number from 1 to 10 → `"quantity must be a whole number from 1 to 10"` (hint: `Number.isInteger`)

   Any problems → `400` with `{ "error": "Invalid order", "details": [...] }`. Otherwise call `next()`.
4. **Not found.** After all the routes, answer anything unmatched with `404` and `{ "error": "No route for GET /api/nothing" }` (with the real method and URL).
5. **One error handler.** At the very end, add a 4-parameter error handler:
   - **first**, if `express.json()` couldn't read the body, the error's `type` is `"entity.parse.failed"`: reply `400` with `{ "error": "Body must be valid JSON" }` (check this first: these errors have a `status` too, but their message is confusing for visitors)
   - if the error has a `status` (like the route's `HttpError`), reply with that status and `{ "error": err.message }`
   - anything else: `console.error` the error, then reply `500` with `{ "error": "Something went wrong on our side" }`

✅ **You're done when** each test drive request has a logger line, and the replies are, in order: `200`, `201`, `400` (with both details), `400` (`Body must be valid JSON`), `404` (`No order with id 99`), `500` (with the oven error logged above it, but not in the reply) and `404` (`No route for GET /api/nothing`).
