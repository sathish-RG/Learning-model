## Why does this matter?

Props come from outside a component. But some things belong to the component itself and **change over time**: a counter's value, whether a menu is open, the items in a cart. That's **state**. Change the state, and React redraws the page for you. No more rebuilding the list by hand!

## useState: the scoreboard operator 🏟️

At a stadium, you don't climb up and repaint the scoreboard yourself. You tell the operator the new score, and *they* update the board.

`useState` gives you the current value **and** the operator to call:

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);   // 0 is the starting value

  return <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>;
}
```

- `count` is the current value. Treat it as **read-only**.
- `setCount(newValue)` asks React to update it **and redraw** the component.
- Changing it directly (`count = count + 1`) does nothing visible, because React never hears about it.

Hooks like `useState` must be called at the **top level** of your component: never inside `if` statements or loops.

## Events: onClick, onChange... 🖱️

React events look like the HTML attributes, in camelCase, and take a **function**:

```jsx
<button onClick={handleClick}>Save</button>     // ✅ passes the function
<button onClick={handleClick()}>Save</button>   // ❌ calls it straight away, while rendering
```

## The snapshot surprise 📸

Each render sees a **snapshot** of the state. Calling the setter doesn't change `count` straight away: it schedules a new render. So this only adds **1**:

```jsx
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);   // all three say "0 + 1"
```

When the new value depends on the old one, pass an **updater function**. React feeds each one the latest value:

```jsx
setCount((c) => c + 1);
setCount((c) => c + 1);
setCount((c) => c + 1);   // +3 ✅
```

## Arrays and objects: always make a copy 📄

React notices a change by checking whether you gave it a **new** value. If you change an array or object in place, it's still the same one, and React may not redraw. So **never modify state directly**; create an updated copy:

```jsx
// Arrays
setItems([...items, "New item"]);                  // add
setItems(items.filter((item) => item !== "Old"));  // remove

// Objects
setProfile({ ...profile, level: profile.level + 1 });   // change one field
```

❌ `items.push("New item")` and `profile.level++` change the original. Don't!

## Remember ✅

- `const [value, setValue] = useState(start)` holds state; calling the setter redraws the component.
- Events take a function: `onClick={handleClick}`, not `handleClick()`.
- Use an updater, `setCount((c) => c + 1)`, when the new value depends on the old one.
- Never change state in place: copy arrays and objects with spread.
