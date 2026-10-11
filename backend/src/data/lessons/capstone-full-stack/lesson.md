## Why does this matter?

This is it: the whole restaurant, open for business. Everything you've built separately (the React app from Checkpoint C, the Express routes, middleware and authentication from Phase 7, the MongoDB documents and Mongoose schemas from Phase 8) now runs **together**, on **your own computer**, with a real database. This is the shape of almost every web app in production, and a project you can show, extend and deploy.

## The whole restaurant 🍽️

| Restaurant | Task Manager Pro | Where |
|---|---|---|
| 🪑 The dining room | The **React app** (what you see and click) | `frontend/` · http://localhost:5173 |
| 🧑‍🍳 The waiter | `fetch` calls in `src/api.js`, carrying **requests** and **responses** | |
| 🍳 The kitchen | The **Express API**: routes, middleware, rules | `backend/` · http://localhost:5000 |
| 🗄️ The filing cabinet | **MongoDB**: the users and tasks, kept safe on disk | Atlas (the cloud), or your computer |

## One click, start to finish 🔄

What happens when you type "Buy milk" and click **Add**:

1. **React** (`TaskBoard.jsx`) calls `api("/tasks", { method: "POST", body: { title: "Buy milk", priority: "medium" } })`.
2. **The waiter** (`api.js`) sends `POST /api/tasks` to `localhost:5173`. Vite's **proxy** passes everything under `/api` to the API on port 5000, so to the browser it's all one website, and the login cookie travels along automatically.
3. **Express** (`app.js`) logs the request, reads the JSON body (`express.json()`) and the cookies (`cookieParser()`), then hands it to the tasks router.
4. **The guard** (`requireAuth.js`) checks the wristband: the JWT in the `token` cookie. Valid? `req.userId` is now known. Not valid? `401`, and the request stops here.
5. **The route** (`routes/tasks.js`) calls `Task.create({ title, priority, user: req.userId })`.
6. **Mongoose** (`models/Task.js`) validates it (at least 3 characters? a known priority?), fills in the defaults (`done: false`, the timestamps), and saves it to the `tasks` collection in **MongoDB**.
7. The API answers `201 Created` with the new task as JSON. React adds it to its `tasks` state, and the list re-renders.

If anything goes wrong (a 2-letter title, say), Mongoose throws a `ValidationError`, the **error handler** (`middleware/errors.js`) turns it into `400` with the message, and React shows it in a red banner.

## What's in the project 📂

**The API** (`backend/`), every piece from Phases 7 and 8:

| File | What it does | Learned in |
|---|---|---|
| `src/server.js` | Checks the settings, connects to MongoDB, **then** starts listening | Lesson 56 |
| `src/app.js` | Middleware in order: logger, JSON, cookies, routes, 404, errors | Lesson 58 |
| `src/config/db.js` | The one connection to MongoDB | Lesson 64 |
| `src/models/User.js`, `Task.js` | Mongoose schemas: validation, defaults, an index | Lessons 65, 66 |
| `src/routes/auth.js` | Register, log in (bcrypt + JWT in an httpOnly cookie), log out, "me" | Lesson 60 |
| `src/routes/tasks.js` | The REST API for tasks, only ever touching **your** tasks | Lesson 59 |
| `src/middleware/` | `requireAuth` (the guard) and the error handlers | Lessons 58, 60 |
| `.env.example` | The settings you must provide (copied to `.env`) | |

**The React app** (`frontend/`): Checkpoint C's components (`TaskForm`, `TaskList`, `TaskItem`, `FilterBar`), now loading and saving through the API instead of `localStorage`, plus an `AuthForm` for logging in.

## Three ideas that only appear in a real setup 🔑

**Environment variables.** Secrets (the database password, the JWT secret) must **never** be written in the code or pushed to GitHub. They live in a `.env` file on each computer, which `.gitignore` keeps out of Git. Node reads it with `--env-file=.env`, and your code reads `process.env.MONGODB_URI`.

**Two servers, two terminals.** The API and the React app are separate programs: each needs its own terminal running `npm run dev`. In production, the React app is **built** into plain HTML/CSS/JS files (`npm run build`) and served from anywhere; only the API keeps running.

**The login cookie.** After logging in, the API sets a cookie that is `httpOnly` (JavaScript can't read it, so an injected script can't steal it), `sameSite` (other websites can't use it) and `secure` once deployed (HTTPS only). The browser sends it with every request, so React never handles the token at all.

## Remember ✅

- React (dining room) → `fetch` (waiter) → Express (kitchen) → MongoDB (filing cabinet), and back.
- Vite's proxy makes the app and the API one website in development, so cookies just work.
- Middleware order: logger → body and cookie parsers → routes (guarded by `requireAuth`) → 404 → error handler.
- Mongoose validates before saving; the error handler turns its errors into `400`s with clear messages.
- Secrets go in `.env` (never in Git); each server runs in its own terminal.
