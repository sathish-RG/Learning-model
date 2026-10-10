## Your mission: move the logic into a custom hook

All the task logic should live in `useTasks`, so `App` only cares about showing things.

1. **Get the setter.** In `useTasks`, change `const [tasks] = ...` to `const [tasks, setTasks] = ...`.
2. **Add `addTask(title)`.** It adds `{ id: Date.now(), title, done: false }` to the list.
3. **Add `toggleTask(id)`.** It flips `done` for the matching task.
   *Hint:* `tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t))`
4. **Use them in `App`.** Return `{ tasks, addTask, toggleTask }` from the hook. Add an input and button that call `addTask`, and make clicking a task call `toggleTask`.

**Bonus:** cross out finished tasks with `style={{ textDecoration: task.done ? 'line-through' : 'none' }}`.

✅ **You're done when** you can add tasks and click them to cross them out, with the logic inside `useTasks`.
