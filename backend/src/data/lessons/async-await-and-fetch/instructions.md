## Your mission: load the team's tasks

The page, its styles and two data files (`tasks.json`, `users.json`) are locked. Write your code in `app.js`. Go one step at a time.

1. **A fetch helper.** Write `async function getJson(url)`: it fetches `url`, throws `` new Error(`HTTP ${response.status}`) `` if `response.ok` is false, and otherwise returns `await response.json()`.
2. **Load the tasks.** Write `async function loadTasks(url = "./data/tasks.json")`:
   - set `#status` to `Loading…` and clear `#error`
   - `await wait(500)` (pretend the network is slow)
   - load the tasks from `url` **and** the users from `./data/users.json` at the same time, with `Promise.all`
   - show one `li` per task: the title, then a `span.assignee` with ` (NAME)` (find the user whose `id` matches the task's `assigneeId`)
   - set `#status` to `Loaded 3 tasks` (the real count), and log the same text
3. **When it fails.** Wrap the work in `try` / `catch`. In the `catch`: empty the list, set `#error` to `` `Could not load tasks (${error.message})` ``, set `#status` to `Failed`, and `console.error` the error message.
4. **Always.** In `finally`, re-enable both buttons (disable them at the start of `loadTasks`).
5. **Buttons.** `#reload` calls `loadTasks()`. `#broken` calls `loadTasks("./data/missing.json")`. Call `loadTasks()` once when the page opens.

✅ **You're done when** the page shows `Loading…`, then 3 tasks with their assignees and `Loaded 3 tasks`; and clicking **Load from a broken URL** shows `Could not load tasks (HTTP 404)` on the page and a red error in the console.
