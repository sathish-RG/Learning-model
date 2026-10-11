// Lesson 44: lists, keys and conditional rendering.
import { useState } from "react";

const tasks = [
  { id: 1, title: "Learn React components", done: true },
  { id: 2, title: "Practice props", done: true },
  { id: 3, title: "Master React state", done: false },
  { id: 4, title: "Build a search box", done: false },
  { id: 5, title: "Take a break", done: false },
];

export default function App() {
  // 3. query state

  return (
    <main className="page">
      <h1>Tasks</h1>
      <label htmlFor="search">Search</label>
      <input id="search" type="search" placeholder="Type to filter…" />
      <p id="summary">Showing 0 of 5 tasks</p>
      <ul id="task-list">{/* 1-2. The tasks go here */}</ul>
      {/* 4. Show the empty message instead of the list when nothing matches */}
    </main>
  );
}
