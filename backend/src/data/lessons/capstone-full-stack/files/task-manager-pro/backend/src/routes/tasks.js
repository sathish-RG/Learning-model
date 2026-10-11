// The tasks API (REST, Lesson 59). Every route only ever touches the logged-in user's tasks.
const express = require("express");
const Task = require("../models/Task");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();
router.use(requireAuth); // every route below needs a logged-in user

// Only these fields may be changed by the client (never `user`!)
const pick = (body, fields) => Object.fromEntries(fields.filter((f) => body[f] !== undefined).map((f) => [f, body[f]]));

router.get("/", async (req, res) => {
  const tasks = await Task.find({ user: req.userId }).sort({ createdAt: 1 });
  res.json({ tasks });
});

router.post("/", async (req, res) => {
  const task = await Task.create({ ...pick(req.body, ["title", "priority"]), user: req.userId });
  res.status(201).location(`/api/tasks/${task.id}`).json({ task });
});

router.patch("/:id", async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    pick(req.body, ["title", "priority", "done"]),
    { returnDocument: "after", runValidators: true },
  );
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json({ task });
});

// DELETE /api/tasks?done=true clears every completed task
router.delete("/", async (req, res) => {
  if (req.query.done !== "true") return res.status(400).json({ error: "Use DELETE /api/tasks?done=true" });
  await Task.deleteMany({ user: req.userId, done: true });
  res.status(204).end();
});

router.delete("/:id", async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.status(204).end();
});

module.exports = router;
