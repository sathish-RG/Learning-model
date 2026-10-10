## Your mission: lock the API and complete CRUD

The tasks API is open to everyone. Add a simple lock, then finish the CRUD routes.

1. **Finish `requireAuth`.** Read `req.headers.authorization`. If it isn't exactly `` `Bearer ${DEMO_TOKEN}` ``, reply `res.status(401).json({ error: 'Not authenticated' })`. Otherwise call `next()` to let the request through.
2. **Complete CRUD.** Add `POST`, `PATCH` and `DELETE` routes for `/api/tasks` (reuse your code from Backend Fundamentals), and protect each one with `requireAuth`.
3. **Write some SQL.** In the comment at the bottom, write the `INSERT`, `UPDATE` and `DELETE` statements for a `tasks` table.

✅ **You're done when** the server starts cleanly, and every route uses `requireAuth`.
