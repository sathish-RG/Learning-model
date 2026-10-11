## Your mission: load, change and back up a task list

`tasks.json` (locked) holds three tasks. In `app.js`, everything goes inside the `main` function, which is already `async`.

1. **The paths.** Using `path.join(__dirname, ...)`, build three paths: `tasks.json`, `backup/tasks.json` (inside a `backup` folder) and `missing.json` (a file that doesn't exist).
2. **`loadTasks(file)`.** Write it as in the lesson: read the file, `JSON.parse` it, and return `[]` if the error's code is `"ENOENT"` (rethrow any other error).
3. **Load.** Load `tasks.json` and print `Loaded 3 tasks from tasks.json` (use the real number of tasks, and `path.basename` for the name).
4. **Change it.** Add a task `{ id, title: "Learn the fs module", done: false }`, where `id` is one more than the biggest existing `id`. Then mark the task with `id` 2 as done.
5. **Save a backup.** Create the `backup` folder with `fs.mkdir(..., { recursive: true })`, then save the tasks to `backup/tasks.json` as pretty JSON (`JSON.stringify(tasks, null, 2)`). Print `Saved 4 tasks to backup/tasks.json`.
6. **Prove it.** Load `backup/tasks.json` again, **from the file**, and print each task as `[x] Title` (done) or `[ ] Title` (not done).
7. **The missing file.** Load `missing.json` and print `missing.json: 0 tasks`.

✅ **You're done when** the console shows:

```
Loaded 3 tasks from tasks.json
Saved 4 tasks to backup/tasks.json
[x] Buy milk
[x] Walk the dog
[ ] Read a chapter
[ ] Learn the fs module
missing.json: 0 tasks
```
