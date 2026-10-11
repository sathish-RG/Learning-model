## Why does this matter?

Almost every screen shows a **list** of something: messages, products, tasks, search results. And almost every screen shows **different things in different situations**: a spinner while loading, "No results" when the list is empty, a badge only for new items. This lesson covers both.

## Lists: map turns data into elements 🏭

In Phase 3, `map` was a factory machine that transformed every item. In React, it turns an array of **data** into an array of **elements**:

```jsx
const fruits = ["Apple", "Banana", "Cherry"];

return (
  <ul>
    {fruits.map((fruit) => (
      <li key={fruit}>{fruit}</li>
    ))}
  </ul>
);
```

React shows an array of elements one after another.

## Keys: name tags for list items 🏷️

Every item in a list needs a `key`: a **unique, stable** name tag. When the list changes, React uses the keys to tell which items were added, removed or moved, instead of redrawing everything.

```jsx
{tasks.map((task) => <TaskItem key={task.id} task={task} />)}
```

- Use an **id from your data**: `task.id`.
- Keys must be unique among siblings, and stay the same for the same item.
- ⚠️ **Avoid the array index** (`key={index}`) when items can be added, removed or reordered. Indexes shift, and React gets confused about which item is which, which can mix up checkboxes and typed text.

The `key` goes on the **outermost** element returned from `map`.

## Filtering what's shown 🔍

You don't need a separate state for the filtered list. **Calculate it during render** from the state you already have:

```jsx
const [query, setQuery] = useState("");
const visible = tasks.filter((task) => task.title.toLowerCase().includes(query.toLowerCase()));
```

Every time `query` changes, the component re-renders and `visible` is recalculated. Storing values you can calculate is a common source of bugs; avoid it.

## Conditional rendering: showing things sometimes 🚦

JSX is JavaScript, so you choose what to show with ordinary JavaScript:

**`&&`: show something, or nothing**

```jsx
{task.done && <span className="badge">Done</span>}
```

If the left side is falsy, nothing is shown. ⚠️ Careful with numbers: `{items.length && <List />}` shows a **0** when the list is empty! Use `{items.length > 0 && <List />}`.

**Ternary: this or that**

```jsx
{visible.length > 0 ? <ul>...</ul> : <p className="empty">No tasks match.</p>}
```

**Early return: a whole different screen**

```jsx
if (isLoading) return <p>Loading…</p>;
```

## Remember ✅

- `array.map(...)` turns data into elements.
- Every list item needs a unique, stable `key`, ideally an id. Avoid indexes.
- Calculate filtered lists during render; don't store them in extra state.
- Show things conditionally with `&&`, the ternary `? :`, or an early `return`.
