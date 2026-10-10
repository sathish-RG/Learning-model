## Your mission: fake an API call

Real apps load tasks from a server, which takes time. You'll pretend to be that server with a Promise and a delay, then load the tasks with `async/await`.

1. **Finish `fetchTasks(delay)`.** Return a `new Promise` that waits `delay` milliseconds and then resolves with `DUMMY_TASKS`.
   *Hint:* inside the Promise, use `setTimeout(() => resolve(...), delay)`.
2. **Finish `loadTasks()`.** After the "Loading..." line, `await fetchTasks()`, then show each task title in a list inside `app`.
3. **Handle errors.** Wrap your code in `try/catch`, and show `"Couldn't load tasks"` if something fails.

✅ **You're done when** the preview shows "Loading..." for about a second, then the two tasks.
