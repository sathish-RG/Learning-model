## Why does this matter?

In Checkpoint B you built Task Manager Pro in plain JavaScript, rebuilding the list by hand in `render()`. Now you'll rebuild it the way most modern teams would: as **React components** with **state**. You'll notice how much simpler it gets: no `createElement`, no manual re-rendering, no delegation tricks.

## Checkpoint B → React

| Plain JavaScript (Checkpoint B) | React (now) |
|---|---|
| A `tasks` array + `render()` | `useState` for `tasks`; React re-renders for you |
| `createElement` and `append` | JSX and `tasks.map(...)` |
| `data-id` + event delegation | `onClick={() => onDelete(task.id)}` on each item |
| Reading `input.value` on submit | A controlled input with `value` + `onChange` |
| `localStorage` after every change | `useEffect(..., [tasks])` saves automatically |

## Lifting state up 🏗️

Several components need the tasks: the list shows them, the form adds to them, the filter bar chooses which to show, and the header counts them. So where should the `tasks` state live?

**In the closest common parent**, which here is `App`. This is called **lifting state up**. Then:

- **Data flows down** as props: `<TaskList tasks={visibleTasks} />`
- **Actions flow up** through callback props: `<TaskForm onAdd={addTask} />`

Think of `App` as the team captain: it holds the official scorebook (state). Players (child components) receive what they need to know, and report back to the captain when something happens. They never edit the scorebook themselves.

## The component tree 🌳

```
App                ← owns tasks + filter state, and the handlers
├── TaskForm       ← its own state for the typed title; calls onAdd(title, priority)
├── FilterBar      ← shows the filter; calls onChange(newFilter)
└── TaskList       ← receives the visible tasks
    └── TaskItem   ← one task; calls onToggle(id) / onDelete(id)
```

## Calculate, don't store 🧮

The visible tasks and the "tasks left" count can be **calculated** from `tasks` and `filter` on every render. Don't keep them in extra state: copies of data get out of sync, which is the classic source of "the counter is wrong" bugs.

```jsx
const visibleTasks = tasks.filter((task) =>
  filter === "active" ? !task.done : filter === "done" ? task.done : true,
);
const left = tasks.filter((task) => !task.done).length;
```

## Immutable updates, one more time ✋

Every handler in `App` creates **new** data rather than changing the old:

```jsx
const toggleTask = (id) =>
  setTasks(tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task)));
```

## Remember ✅

- Put shared state in the closest common parent (lifting state up).
- Data down (props), actions up (callback props).
- Calculate filtered lists and counts during render; don't store them.
- Save to `localStorage` with an effect that depends on `tasks`.
