// The Express app (the kitchen): middleware first, then the routes, then the error handlers.
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const { notFound, errorHandler } = require("./middleware/errors");

const app = express();

// Log every request: "POST /api/tasks → 201 (12ms)"
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => console.log(`${req.method} ${req.originalUrl} → ${res.statusCode} (${Date.now() - start}ms)`));
  next();
});
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

// A quick "is everything connected?" check for the setup checklist
app.get("/api/health", (req, res) => {
  res.json({ ok: true, database: mongoose.connection.readyState === 1 ? "connected" : "not connected" });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
