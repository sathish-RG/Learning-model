## Your mission: Task Manager Pro in React

The components and their markup are ready in `components/`, and the design is locked. Wire up the state and the props, one step at a time.

1. **State in App.** In `App.jsx`, create `tasks` state (an empty array for now) and `filter` state (`"all"`).
2. **Handlers in App.** Write these, all using **immutable** updates:
   - `addTask(title, priority)`: adds `{ id: Date.now(), title, priority, done: false }`
   - `toggleTask(id)`
   - `deleteTask(id)`
   - `clearDone()`
3. **The form** *(controlled form).* In `TaskForm.jsx`, make the title input and the priority select controlled. On submit, prevent the reload; if the trimmed title is shorter than 3 characters, show `Title must be at least 3 characters` in `.form-error`; otherwise call `onAdd(title, priority)` and clear the title. In `App.jsx`, render `<TaskForm onAdd={addTask} />`.
4. **The list** *(props and keys).* In `TaskList.jsx`, map the `tasks` prop to `<TaskItem key={task.id} ... />`, passing `task`, `onToggle` and `onDelete`. In `TaskItem.jsx`:
   - the `li` gets the class `done` when the task is done
   - the checkbox's `checked` is `task.done`, and its `onChange` calls `onToggle(task.id)`
   - the title, and the priority badge with the class `priority PRIORITY`
   - the `×` button calls `onDelete(task.id)`
5. **Filter and count** *(calculate, don't store).* In `App.jsx`, calculate `visibleTasks` and the number of tasks left. Pass the visible tasks to `TaskList`. Show `N tasks left` in `#task-count`. In `FilterBar.jsx`, each button sets `aria-pressed` to whether it's the current filter, and calls `onChange("all" / "active" / "done")`.
6. **Clear completed.** Make the `Clear completed` button call `clearDone`.
7. **Remember everything** *(useEffect).* Start `tasks` from `localStorage` (key `"tasks"`, with a lazy `useState`), and save them with a `useEffect` that depends on `[tasks]`.

✅ **You're done when** you can type a task and click **Add** (or press Enter) and it appears while the box clears; tick it to cross it out; delete it; filter the list; clear completed; and everything is still there after refreshing the preview.
