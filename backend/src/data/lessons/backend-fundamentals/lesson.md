## Why does this matter?

So far, everything has lived in the browser. Refresh the page and your tasks are gone, and nobody else can see them. To save data and share it, you need a **backend**: a program running on a server.

## A restaurant 🍽️

- The **frontend** (what you've built so far) is the dining room, where customers look at the menu and place orders.
- The **backend** is the kitchen. It takes orders, prepares them, and keeps the ingredients (the data).
- The **API** is the waiter carrying orders between the two.

## Node.js and Express

- **Node.js** lets JavaScript run outside the browser, on a computer or server. You already know the language!
- **Express** makes building a server simple. It's like a receptionist who sends each visitor to the right room.

```js
const express = require('express');
const app = express();

app.get('/api/tasks', (req, res) => {
  res.json([{ title: 'Buy milk' }]);
});

app.listen(3000);
```

## Routes: an address plus an action 📮

Each route is a web address combined with an action word (an *HTTP method*):

- `GET`: read something
- `POST`: create something new
- `PATCH`: update part of something
- `DELETE`: remove something

## REST: a naming habit everyone shares

A **REST API** names URLs after *things* (nouns) and lets the method say *what to do*:

```
GET    /api/tasks       → list all tasks
POST   /api/tasks       → create a task
PATCH  /api/tasks/5     → update task 5
DELETE /api/tasks/5     → delete task 5
```

Because everyone follows the same pattern, other developers can guess how your API works.

## Requests and responses 📨

Each route receives a **request** (`req`), which is what the customer sent, and builds a **response** (`res`), which is what you send back:

- `req.body`: data sent with the request, like a new task's title
- `req.params.id`: the `5` in `/api/tasks/5`
- `res.status(201).json(task)`: reply with a status code and data

## Status codes: quick replies 🚦

- `200` OK
- `201` Created
- `400` Bad request (the *customer* made a mistake)
- `404` Not found
- `500` Server error (the *kitchen* made a mistake)

## Middleware: checkpoints 🛂

Middleware runs on every request **before** it reaches your route, like security at an airport. For example, `express.json()` unpacks JSON data so you can read `req.body`.

## Remember ✅

- The **backend** is the kitchen: it handles orders and stores data.
- **Express routes** = address + method (GET, POST, PATCH, DELETE).
- **REST**: nouns in the URL, the method says the action.
- Always reply with a sensible **status code**.
