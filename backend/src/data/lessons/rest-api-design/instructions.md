## Your mission: a complete tasks API

Build all of it in `server.js`. Every error reply is `{ "error": "message" }`. `public/index.html` (locked) is a task board that **reads** your API: its filters, sorting and pages only work once your `GET /api/tasks` does. The test drive covers everything else.

1. **The board.** `GET /` → send `public/index.html` (as in Lesson 57).
2. **List, filter, sort and paginate.** `GET /api/tasks` → `200` with `{ data, page, limit, total }`:
   - `?done=true` / `?done=false` keeps only those tasks
   - `?sort=title` sorts A→Z, `?sort=-title` Z→A (sort a copy!)
   - `page` defaults to `1`, `limit` to `5` (at most `20`)
   - `total` is how many tasks matched, **before** paging
3. **Read one.** `GET /api/tasks/:id` → `200` with the task, or `404` with `Task 8 not found` (the real id). Tip: write a `findTask(id)` helper for the next steps.
4. **Create.** `POST /api/tasks` → `title` must be a non-empty string, otherwise `400` with `title is required`. Create `{ id, title, done: false }` (trim the title, `id` from `nextId`), and answer `201` with a `Location: /api/tasks/ID` header and the task.
5. **Replace.** `PUT /api/tasks/:id` → `404` if it doesn't exist. Both a non-empty string `title` **and** a boolean `done` are required, otherwise `400` with `PUT needs a title and done`. Answer `200` with the updated task.
6. **Change.** `PATCH /api/tasks/:id` → `404` if it doesn't exist. Update only the fields that were sent. If `title` is sent but isn't a non-empty string, or `done` is sent but isn't a boolean, answer `400` with `Invalid title or done`. Answer `200` with the task.
7. **Delete.** `DELETE /api/tasks/:id` → `404` if it doesn't exist; otherwise remove it and answer `204` with **no body**.

✅ **You're done when** the board's filters, sorting and pages all work, and the test drive's replies are, in order:

```
200, 200, 200, 201, 400, 200, 200, 400, 200, 204, 404, 404
```

with `total` `7`, then `4`, then `7` for the three lists, `Location: /api/tasks/8` on the `201`, and no body after the `204`.
