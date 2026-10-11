## Why does this matter?

Some jobs apply to **many** routes: logging every request, reading JSON bodies, checking data, checking who's logged in, handling errors. Copying that code into every route would be a mess. **Middleware** lets you write each job once and run it for every request (or just the routes that need it). It's the heart of Express: Express is basically a chain of middleware.

## Middleware is airport security ✈️

Before you board a plane, you pass a series of **checkpoints**, in order:

1. 🎫 **Check-in** looks at your ticket.
2. 🛂 **Passport control** checks who you are.
3. 🧳 **The security scanner** checks your bag.
4. ✈️ Finally, **the gate**: you board.

Each checkpoint can do one of two things: **wave you through** to the next one, or **stop you** right there ("Sorry, that bag is too big"). Nobody reaches the gate without passing every checkpoint before it.

In Express, every request walks through your middleware the same way, in the order you added it, before it reaches the **route handler** (the gate).

## The shape of middleware: (req, res, next) 🚦

A middleware is a function with a third parameter, `next`:

```js
function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next(); // ✅ wave them through to the next checkpoint
}

app.use(logger); // run it for EVERY request (add it before the routes!)
```

Inside a middleware you either:

- call **`next()`**: carry on to the next middleware or route, **or**
- **send a response** (`res.status(400).json(...)`): stop here; the route never runs.

Do neither, and the request is stuck at the checkpoint forever.

## Order matters 📋

Middleware runs **top to bottom**, in the order of your `app.use` and route lines. A logger added after the routes would never see the requests they answer.

```js
app.use(logger);         // 1. yours: log every request (first, so it sees them all)
app.use(express.json()); // 2. built-in middleware: reads JSON bodies into req.body
app.get(...);            // 3. the routes
app.use(notFound);       // 4. nobody answered? → 404
app.use(errorHandler);   // 5. something went wrong? → one place handles it
```

`express.json()` is middleware too: it reads the request body stream (Lesson 56!) and parses it, so your routes can simply use `req.body`. If the body isn't valid JSON, it jumps straight to the error handler, skipping everything after it. That's why the logger goes **first**: put it after `express.json()`, and requests with broken JSON would never be logged.

## Measuring the trip: res.on("finish") ⏱️

A logger runs **before** the route, so the status code isn't known yet. Listen for the response's `"finish"` event, which fires once it has been sent:

```js
function logger(req, res, next) {
  const start = Date.now();
  res.on("finish", () => {
    console.log(`${req.method} ${req.originalUrl} → ${res.statusCode} (${Date.now() - start}ms)`);
  });
  next();
}
```

## Middleware for some routes only 🧳

You can put middleware on **one route**, between the path and the handler. It's perfect for validation: the handler only runs if the data is good.

```js
function validateOrder(req, res, next) {
  const errors = [];
  if (typeof req.body.item !== "string" || !req.body.item.trim()) errors.push("item is required");

  if (errors.length) {
    return res.status(400).json({ error: "Invalid order", details: errors }); // 🛑 stopped
  }
  next(); // ✅ through to the handler
}

app.post("/api/orders", validateOrder, (req, res) => {
  // Here we KNOW the order is valid
});
```

## The last two checkpoints: 404 and errors 🧯

**Nobody answered?** A middleware **after all the routes** only runs when no route matched. It's your 404 handler:

```js
app.use((req, res) => {
  res.status(404).json({ error: `No route for ${req.method} ${req.originalUrl}` });
});
```

**Something broke?** A middleware with **four** parameters is an **error handler**. Express jumps straight to it when a route throws an error, or calls `next(error)`:

```js
class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status; // the status code this error should be sent with
  }
}

app.get("/api/orders/:id", (req, res, next) => {
  const order = orders.find((o) => o.id === Number(req.params.id));
  if (!order) return next(new HttpError(404, "No order with id 9")); // → the error handler
  res.json(order);
});

app.use((err, req, res, next) => {       // 4 parameters: Express knows it handles errors
  const status = err.status || 500;      // unknown errors are the server's fault
  if (status === 500) console.error(err); // log the details for YOU...
  res.status(status).json({ error: status === 500 ? "Something went wrong on our side" : err.message });
});                                      // ...but never show them to visitors
```

Why hide the details of a 500? A stack trace tells attackers which files, packages and versions you use. Log it on the server, and send visitors a polite, general message.

> 💡 In Express 4 (used here), an error thrown inside an `async` route isn't caught automatically: wrap the code in `try/catch` and call `next(error)`. Express 5 catches both.

## Remember ✅

- Middleware is `(req, res, next)`: call `next()` to continue, or send a response to stop.
- `app.use(fn)` runs it for every request; `app.post(path, check, handler)` runs it for one route.
- Order matters: body parser and logger first, then routes, then the 404 handler, then the error handler.
- `next(error)` (or a thrown error) jumps to the 4-parameter error handler.
- For 500 errors, log the details on the server and send a general message.
