// Lesson 58: airport security for an orders API. The routes (the gates) are done;
// add the checkpoints (middleware) around them.
const express = require("express");
const testDrive = require("./requests");

const app = express();

// An error that knows which status code it should be sent with
class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const orders = [{ id: 1, item: "Masala dosa", quantity: 2 }];
let nextOrderId = 2;

// 1. logger(req, res, next): prints "METHOD URL → STATUS (Nms)" when the response finishes

// 3. validateOrder(req, res, next): 400 with every problem, or next()

// 1-2. Checkpoints for EVERY request: your logger first, then express.json()

// ---- The routes (already written) ----
app.get("/", (req, res) => {
  res.send('<h1>Orders API</h1><p>Try <a href="/api/orders">/api/orders</a>, /api/orders/99 or /api/nothing in the address bar.</p>');
});

app.get("/api/orders", (req, res) => {
  res.json(orders);
});

app.get("/api/orders/:id", (req, res, next) => {
  const order = orders.find((o) => o.id === Number(req.params.id));
  if (!order) return next(new HttpError(404, `No order with id ${req.params.id}`));
  res.json(order);
});

// 3. Add validateOrder to this route
app.post("/api/orders", (req, res) => {
  const order = { id: nextOrderId++, item: req.body.item.trim(), quantity: req.body.quantity };
  orders.push(order);
  res.status(201).location(`/api/orders/${order.id}`).json(order);
});

// A bug, on purpose: see what visitors get when something breaks
app.get("/api/crash", () => {
  throw new Error("The oven exploded");
});
// ---- End of the routes ----

// 4. Not found: runs only when no route above answered

// 5. The error handler (4 parameters), at the very end

app.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
  testDrive(); // locked (requests.js): calls your API and prints each reply
});
