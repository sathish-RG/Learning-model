# Task Manager Pro

A full-stack (MERN) task manager: **M**ongoDB, **E**xpress, **R**eact and **N**ode.js.
Accounts with hashed passwords, a login kept in an httpOnly cookie, and every user's tasks
saved in MongoDB.

```
task-manager-pro/
├── backend/    The API (Express + Mongoose) → http://localhost:5000
└── frontend/   The React app (Vite)          → http://localhost:5173
```

## You need

- **Node.js 22** or newer (`node -v` to check)
- A **MongoDB** database: a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster, or MongoDB installed on your computer

## Run it

**1. The API** (first terminal):

```bash
cd backend
cp .env.example .env      # Windows (cmd): copy .env.example .env
# Edit .env: paste your MONGODB_URI and set a long random JWT_SECRET
npm install
npm run dev
```

You should see `MongoDB connected` and `API listening on http://localhost:5000`.
Check http://localhost:5000/api/health → `{"ok":true,"database":"connected"}`.

**2. The React app** (second terminal):

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173, create an account and add some tasks.

## The API

| Method | Path | Does |
|---|---|---|
| `POST` | `/api/auth/register` | Create an account (and log in) |
| `POST` | `/api/auth/login` | Log in: sets the `token` cookie |
| `POST` | `/api/auth/logout` | Log out: clears the cookie |
| `GET` | `/api/auth/me` | The logged-in user |
| `GET` | `/api/tasks` | Your tasks, oldest first |
| `POST` | `/api/tasks` | Add a task: `{ title, priority }` |
| `PATCH` | `/api/tasks/:id` | Change `title`, `priority` or `done` |
| `DELETE` | `/api/tasks/:id` | Delete a task |
| `DELETE` | `/api/tasks?done=true` | Delete every completed task |
| `GET` | `/api/health` | Is the API up, and connected to MongoDB? |
