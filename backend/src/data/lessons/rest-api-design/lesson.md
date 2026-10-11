## Why does this matter?

You can now build any route you like, but **which** routes should an API have? What should they be called, and what should they answer? **REST** is the set of conventions almost every web API follows. Follow it, and any developer (including future you, and the React app you'll connect in the Capstone) can guess how your API works without reading a single line of it.

## Resources: nouns in the URL, verbs in the method 🧱

REST is built around **resources**: the *things* your app manages (tasks, users, orders). Each one gets a URL with a **plural noun**, and the **HTTP method** says what to do with it:

| Method + URL | Action | Success answer |
|---|---|---|
| `GET /api/tasks` | **List** all tasks | `200` + the list |
| `GET /api/tasks/7` | **Read** task 7 | `200` + the task |
| `POST /api/tasks` | **Create** a task | `201` + the new task, and a `Location` header |
| `PUT /api/tasks/7` | **Replace** task 7 completely | `200` + the updated task |
| `PATCH /api/tasks/7` | **Change some fields** of task 7 | `200` + the updated task |
| `DELETE /api/tasks/7` | **Delete** task 7 | `204 No Content`, with no body |

Together, Create, Read, Update and Delete are called **CRUD**. Notice what's **not** in the URLs: verbs. Not `/api/getTasks`, `/api/createTask` or `/api/deleteTask/7`: the method already says that.

## Status codes: tell the truth 🚦

| Situation | Code |
|---|---|
| It worked, here's the data | `200 OK` |
| It worked, and something new now exists | `201 Created` (+ `Location: /api/tasks/8`) |
| It worked, nothing to send back (after a delete) | `204 No Content` |
| The data sent is wrong (missing title…) | `400 Bad Request` |
| That task doesn't exist | `404 Not Found` |
| Our code broke | `500 Internal Server Error` |

Send errors in **one consistent shape**, for example always `{ "error": "message" }`, so the frontend can show any of them the same way.

```js
res.status(201).location(`/api/tasks/${task.id}`).json(task); // created
res.status(204).end();                                       // deleted: no body at all
```

## PUT vs PATCH 🔁

Both update, but differently:

- **PUT replaces** the whole task: you must send **every** field (`title` **and** `done`). Anything you leave out is a mistake, so answer `400`.
- **PATCH changes only what you send**: `{ "done": true }` ticks the task and leaves the title alone.

```js
// PATCH: copy only the fields that were sent
if (req.body.title !== undefined) task.title = req.body.title.trim();
if (req.body.done !== undefined) task.done = req.body.done;
```

Always **check the types** of what you're given: a `done` of `"yes"` must be rejected with `400`, or bad data creeps into your database.

## Filter, sort and paginate: the query string 🔍

A list can get huge. Let the client ask for just the part it needs, with **optional** query string settings on the **list** route:

| Request | Meaning |
|---|---|
| `GET /api/tasks?done=false` | **Filter**: only the tasks that aren't done |
| `GET /api/tasks?sort=title` | **Sort** by title, A→Z (`-title` for Z→A) |
| `GET /api/tasks?page=2&limit=3` | **Paginate**: 3 per page, the 2nd page (tasks 4–6) |

Pagination is two lines of maths:

```js
const page = Math.max(1, Number(req.query.page) || 1);                  // default: page 1
const limit = Math.min(20, Math.max(1, Number(req.query.limit) || 5));  // default 5, at most 20
const start = (page - 1) * limit;
const pageOfTasks = tasks.slice(start, start + limit);
```

Never trust the client's numbers: the `Math.max` and `Math.min` keep `?limit=1000000` from sending your whole database. And tell the client where it is, so a page can show "Page 2 of 3":

```json
{ "data": [ ... ], "page": 2, "limit": 3, "total": 7 }
```

Filter **first**, then sort, then cut out the page: `total` is the number of matching tasks, before paging.

> 💡 Sorting text: `a.title.localeCompare(b.title)` sorts A→Z; swap `a` and `b` for Z→A. And `[...tasks]` makes a copy before `.sort()`, so the original array stays in its order.

## Remember ✅

- Resources are **plural nouns** (`/api/tasks`, `/api/tasks/7`); the **method** is the verb.
- `GET` list/read → `200`, `POST` → `201` + `Location`, `PUT`/`PATCH` → `200`, `DELETE` → `204`.
- Bad input → `400`, unknown id → `404`, always in one error shape.
- `PUT` replaces (every field required); `PATCH` changes only the fields sent.
- Filter, sort and paginate with the query string, with safe defaults and limits.
