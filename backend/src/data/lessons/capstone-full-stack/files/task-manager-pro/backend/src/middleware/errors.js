const mongoose = require("mongoose");

// No route matched
function notFound(req, res) {
  res.status(404).json({ error: `No route for ${req.method} ${req.originalUrl}` });
}

// One place for every error. Express 5 also sends errors thrown in async routes here.
// eslint-disable-next-line no-unused-vars -- Express needs all 4 parameters to see an error handler
function errorHandler(err, req, res, next) {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Body must be valid JSON" });
  }
  // A Mongoose validator said no: show its messages (e.g. "Title must be at least 3 characters")
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({ error: Object.values(err.errors).map((e) => e.message).join(". ") });
  }
  // An id that isn't a valid ObjectId, e.g. /api/tasks/abc
  if (err instanceof mongoose.Error.CastError) {
    return res.status(404).json({ error: "Not found" });
  }
  // A unique index said no (the only one is users.email)
  if (err.code === 11000) {
    return res.status(409).json({ error: "That email is already registered" });
  }
  if (err.status) {
    return res.status(err.status).json({ error: err.message });
  }

  console.error(err);
  res.status(500).json({ error: "Something went wrong on our side" });
}

module.exports = { notFound, errorHandler };
