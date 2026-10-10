## Why does this matter?

You've built Task Manager Pro's structure (Checkpoint A) and its design (Checkpoint A2). Now you'll make it **actually work**: typing a task and pressing Add puts it on the page, ticking it crosses it out, and your tasks are still there tomorrow. This is the moment it becomes a real app.

## The big idea: one source of truth 📋

Beginners often try to keep the *page itself* as the record of their tasks, poking at list items here and there. That gets messy fast. Professionals keep a **single source of truth**: a plain JavaScript array of task objects.

```js
let tasks = [
  { id: 1, title: "Learn the DOM", priority: "high", done: false },
];
```

Think of a **scoreboard** at a match. The official score is written in the scorekeeper's book; the big screen just *shows* what the book says. Your `tasks` array is the book, and the page is the screen.

## The render pattern 🔁

Every change follows the same three steps:

1. **Update the data:** add, change or remove something in `tasks`.
2. **Save it:** store `tasks` in `localStorage`.
3. **Redraw:** call `render()`, which wipes the list and rebuilds it from `tasks`.

```js
function render() {
  list.textContent = "";          // wipe the screen
  tasks.forEach((task) => {       // redraw it from the book
    const li = document.createElement("li");
    li.textContent = task.title;
    list.append(li);
  });
}
```

Because the page is always rebuilt from the data, it can **never get out of sync**. This idea is exactly how React works, which you'll meet in Phase 6!

## Finding the right task: ids 🔖

When a delete button is clicked, how do you know *which* task it belongs to? Store the task's id on its list item with a `data-` attribute:

```js
li.dataset.id = task.id;          // becomes <li data-id="1">
// later, in a delegated click handler:
const id = Number(event.target.closest("li").dataset.id);
tasks = tasks.filter((task) => task.id !== id);
```

`Date.now()` makes an easy unique id for new tasks.

## Your toolbox 🧰

| Lesson | Where it fits |
|---|---|
| 29. The DOM | `render()`: `createElement`, `classList`, `textContent` |
| 30. Events & delegation | One listener on the list for ticking and deleting |
| 31. Forms | The add-task form: `preventDefault`, validation, `reset()` |
| 32. Storage & timers | Saving tasks in `localStorage`, loading them on start |
| Phase 3 | Arrays of objects, `filter`, `map`, functions |

## Plan it in small steps 🪜

Don't write it all at once. Get each step working, and check it in the preview, before moving on:

1. Show a hard-coded task with `render()`.
2. Add tasks with the form.
3. Tick and delete them.
4. Save and load.
5. Filters and the counter.

## Remember ✅

- Keep one source of truth: the `tasks` array. The page just displays it.
- Every change: update the data → save → `render()`.
- Use `data-id` to connect list items to their tasks, and delegation to handle their clicks.
