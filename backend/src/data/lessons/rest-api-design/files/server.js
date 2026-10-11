// Lesson 59: a complete, RESTful tasks API.
const fs = require("fs");
const path = require("path");
const express = require("express");
const testDrive = require("./requests");

const app = express();
app.use(express.json());

const PAGE = path.join(__dirname, "public", "index.html");

let tasks = [
  { id: 1, title: "Buy milk", done: true },
  { id: 2, title: "Walk the dog", done: false },
  { id: 3, title: "Read a chapter", done: false },
  { id: 4, title: "Call mom", done: true },
  { id: 5, title: "Water the plants", done: false },
  { id: 6, title: "Book the dentist", done: false },
  { id: 7, title: "Clean the kitchen", done: true },
];
let nextId = 8;

// 1. GET /  → the task board (public/index.html)

// 2. GET /api/tasks  → { data, page, limit, total }, with ?done=, ?sort=, ?page= and ?limit=

// 3. GET /api/tasks/:id

// 4. POST /api/tasks

// 5. PUT /api/tasks/:id

// 6. PATCH /api/tasks/:id

// 7. DELETE /api/tasks/:id

app.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
  testDrive(); // locked (requests.js): calls your API and prints each reply
});
