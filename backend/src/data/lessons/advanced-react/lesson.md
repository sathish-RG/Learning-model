## Why does this matter?

As your app grows, two problems show up:

1. **Passing data down many layers.** If a component deep inside the app needs the logged-in user, you'd have to pass it through every component in between. It's like passing a note through the whole classroom to reach the back row. (This is called *prop drilling*.)
2. **Copy-pasted logic.** Several components end up repeating the same code.

This module gives you tools for both.

## Custom hooks: your own tools 🧰

A custom hook is a function, starting with `use`, that packages state and logic so any component can reuse it. It's like a recipe card you can hand to any cook.

```jsx
function useToggle() {
  const [on, setOn] = useState(false);
  const toggle = () => setOn(!on);
  return { on, toggle };
}

// in any component:
const { on, toggle } = useToggle();
```

## Context: a notice board 📌

Context lets you pin data at the **top** of your app so any component can read it directly, with no passing hand to hand. It's great for things the whole app needs, like the theme or the logged-in user.

## Redux Toolkit: a central warehouse 🏬

For bigger apps where many parts read and change the same data, Redux keeps it all in **one central store** with clear rules:

- **Store**: the warehouse that holds all the app's data
- **Slice**: one department, like "tasks"
- **Action**: a request form, like "please add this task"
- **Reducer**: the clerk who reads the form and updates the records

```jsx
dispatch(addTask("Buy milk")); // send the request form
const tasks = useSelector((state) => state.tasks); // read the records
```

Use Redux when lots of components share data. For small apps, `useState` and Context are often enough.

## Performance: don't redo work for nothing ⚡

React redraws a component whenever its state or props change. Usually that's fast. When it isn't:

- `useMemo` remembers the result of a slow calculation
- `React.memo` skips redrawing a component if its props didn't change
- `useCallback` remembers a function so it isn't recreated every time

Only reach for these when something actually feels slow. Measure first!

## Remember ✅

- **Custom hooks** let components share logic.
- **Context** shares data without passing it through every layer.
- **Redux** is a central warehouse: dispatch actions, and reducers update the store.
- Optimize only when something is actually slow.
