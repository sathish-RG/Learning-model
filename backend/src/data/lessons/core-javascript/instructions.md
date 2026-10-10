## Your mission: write the task logic

Before using React, you'll write Task Manager Pro's logic in plain JavaScript. Two functions are waiting for you in the editor.

1. **Finish `validateTaskTitle(title)`.** If the title is empty or shorter than 3 characters, return the message `"Title must be at least 3 characters"`. Otherwise, return `null`.
   *Hint:* `title.trim().length` gives you the length without extra spaces.
2. **Finish `filterTasks(list, status)`.**
   - `'done'` → only tasks where `done` is `true`
   - `'pending'` → only tasks where `done` is `false`
   - `'all'` → every task

   *Hint:* use `list.filter((task) => ...)`.
3. **Check the preview.** It shows the pending tasks and the result of checking an empty title.

✅ **You're done when** the preview lists only the 2 pending tasks and shows your "at least 3 characters" message.
