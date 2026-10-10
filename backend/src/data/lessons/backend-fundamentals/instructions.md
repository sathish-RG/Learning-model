## Your mission: build the tasks API

Your server can already list tasks with `GET /api/tasks`. Now add the rest of the routes.

1. **Create a task: `POST /api/tasks`.** Read `title` from `req.body`. If it's missing or shorter than 3 characters, reply `res.status(400).json({ error: 'Title must be at least 3 characters' })`. Otherwise, add `{ id: Date.now(), title, done: false }` to `tasks` and reply with status `201` and the new task.
2. **Update a task: `PATCH /api/tasks/:id`.** Find the task with `Number(req.params.id)`. If there isn't one, reply `404`. Otherwise flip its `done` value and send it back.
3. **Delete a task: `DELETE /api/tasks/:id`.** Remove it from the list and reply `res.status(204).end()`.

*Tip:* in a real project, you'd test these with a tool like Postman or `curl`.

✅ **You're done when** the server starts without errors and shows "Task API running on port 3000".
