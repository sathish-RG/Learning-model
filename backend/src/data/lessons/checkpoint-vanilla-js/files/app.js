// Checkpoint B: make Task Manager Pro work.
// One source of truth: the `tasks` array. Every change: update the data → save → render().

const list = document.querySelector("#task-list");
const form = document.querySelector("#task-form");
const titleInput = document.querySelector("#task-title");

let tasks = [];        // 5. Load the saved tasks instead of starting empty
let filter = "all";    // "all" | "active" | "done"

// 1 & 4. render(): rebuild #task-list from `tasks`, and update #task-count
function render() {}

// 5. save(): store `tasks` in localStorage

// 2. Add a task (form submit)

// 3. Tick and delete (one listener on the list)

// 6. Filters

// 7. Clear completed

render();
