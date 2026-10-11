## Why does this matter?

Rendering should only *describe* the screen. But apps also need to **reach outside React**: start a timer, load data from a server, listen to the window, change the page title. These are called **side effects**, and `useEffect` is where they belong.

## A component's life: moving into an apartment 🏠

A component has a life, just like renting an apartment:

1. **Moving in (mount):** it appears on the screen for the first time. You unpack: start timers, subscribe to things, load data.
2. **Living there (update):** things change, and it re-renders. Sometimes you need to react to a specific change.
3. **Moving out (unmount):** it disappears from the screen. You must **clean up**: stop timers, cancel subscriptions. Otherwise you leave the taps running for the next tenant!

## useEffect: "after you've drawn the screen, also do this" 📬

```jsx
import { useEffect } from "react";

useEffect(() => {
  console.log("I appeared on the screen");
}, []);
```

The function runs **after** React has updated the screen. The array at the end, the **dependency array**, says *when* it runs again:

| Dependency array | When the effect runs |
|---|---|
| `[]` (empty) | Once, after the first render (mount) |
| `[count]` | After the first render, and again whenever `count` changes |
| *(none)* | After **every** render (rarely what you want) |

```jsx
useEffect(() => {
  document.title = `${count} clicks`;   // keep the tab title in sync
}, [count]);
```

**Rule:** list every value from your component that the effect uses. If the effect reads `count`, put `count` in the array.

## Cleanup: moving out 🧹

If your effect starts something that keeps going, **return a cleanup function** that stops it:

```jsx
useEffect(() => {
  const id = setInterval(() => console.log("tick"), 1000);

  return () => {
    clearInterval(id);   // runs when the component disappears
  };
}, []);
```

React runs the cleanup when the component **unmounts**, and also **before re-running** the effect (when its dependencies change), so the old timer is stopped before a new one starts. Forget the cleanup, and the timer keeps ticking after the component is gone: a **memory leak**.

## Loading data when a component appears 📦

```jsx
useEffect(() => {
  let ignore = false;                  // becomes true if we move out first

  fetchUsers().then((users) => {
    if (!ignore) setUsers(users);      // don't update a component that's gone
  });

  return () => {
    ignore = true;
  };
}, []);
```

The `ignore` flag protects against a response arriving **after** the component has disappeared. (Effect functions can't be `async` themselves, so use `.then`, or define an `async` function inside the effect and call it.)

## A note on StrictMode 🔁

Real projects usually wrap the app in `<StrictMode>`. In development, it deliberately mounts every component **twice** (mount, clean up, mount again) to catch missing cleanups. If you see your effect run twice in a real project, that's why! (It's switched off in these lessons, so the logs stay easy to follow.)

## Remember ✅

- `useEffect(fn, deps)` runs side effects **after** rendering.
- `[]` = once on mount; `[x]` = also whenever `x` changes; no array = after every render.
- Return a cleanup function to stop timers and subscriptions on unmount (and before re-running).
- When loading data, ignore responses that arrive after the component is gone.
