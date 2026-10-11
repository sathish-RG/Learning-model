// Lesson 39: async/await and fetch. This file runs as a modern ES module.

// Pretends the network is slow, so you can see your loading message
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const statusEl = document.querySelector("#status");
const errorEl = document.querySelector("#error");
const list = document.querySelector("#task-list");

// 1. async function loadTasks(): show "Loading…", wait(500), fetch ./data/tasks.json,
//    check response.ok, read the JSON, show the tasks and "Loaded N tasks"

// 2. Load tasks AND users at the same time with Promise.all, to show each assignee's name

// 3. Handle errors with try / catch / finally

// 4. Buttons: #reload and #broken

