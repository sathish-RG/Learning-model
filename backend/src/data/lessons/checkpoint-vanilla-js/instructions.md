## Your mission: make Task Manager Pro work

The page and its design are locked. Write all your code in `app.js`. Work through the steps in order, checking the preview after each one.

1. **Render** *(Lesson 29).* Write `render()`. It empties `#task-list`, then creates one `li` per task. Each `li` has:
   - `data-id` set to the task's id
   - a checkbox (ticked if `done`), plus a `.task-title` span with the title
   - a `.priority` badge, whose class is the priority (e.g. `priority high`)
   - a `.delete` button

   Finished tasks get the class `done`. Call `render()` once when the page loads.
2. **Add a task** *(Lessons 30, 31).* On `#task-form` submit:
   - prevent the reload, and read the trimmed title and the priority
   - if the title is shorter than 3 characters, show `Title must be at least 3 characters` in `#form-error` and stop
   - otherwise, add `{ id: Date.now(), title, priority, done: false }` to `tasks`, render, **clear the title input** and put the cursor back in it with `.focus()`
3. **Tick and delete** *(Lesson 30).* With **one** listener on `#task-list`:
   - ticking a checkbox (the `change` event) flips that task's `done`
   - clicking `.delete` removes the task

   Re-render after each.
4. **The counter.** In `render()`, set `#task-count` to `N tasks left` (the tasks not done).
5. **Save and load** *(Lesson 32).* Save `tasks` to `localStorage` after **every** change. When the page loads, start from the saved tasks (or `[]`).
6. **Filters.** The `.filter` buttons have `data-filter` values of `all`, `active` and `done`. Clicking one shows only those tasks, and sets `aria-pressed="true"` on the chosen button (and `"false"` on the others).
7. **Clear completed.** `#clear-done` removes every finished task.

✅ **You're done when** you can type a task, click **Add**, see it appear and the box clear; tick it to cross it out; delete it; filter the list; and your tasks are still there after refreshing the preview.
