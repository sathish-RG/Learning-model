## Why does this matter?

Sometimes you need to reach a real DOM element (to focus an input or scroll to a message), or remember something **without** redrawing the screen. And as apps grow, some components redraw far more than they need to. This lesson gives you the tools for both, and the judgement to know when *not* to use them.

## useRef: a sticky note React doesn't watch 📝

`useRef` gives you a box with a `.current` property. Unlike state:

- changing `ref.current` does **not** redraw the component
- the value **survives** re-renders

It's like a sticky note on your desk: you can read it and update it any time, but writing on it doesn't make anyone redo the slides.

### Use 1: reaching a DOM element

```jsx
const inputRef = useRef(null);

<input ref={inputRef} />
<button onClick={() => inputRef.current.focus()}>Focus</button>
```

After rendering, React puts the real `<input>` element in `inputRef.current`.

### Use 2: remembering a value without re-rendering

```jsx
const renders = useRef(0);
renders.current++;   // counts renders, without causing more renders!
```

## Why components re-render 🔄

A component re-renders when:

1. its own **state** changes, or
2. its **parent** re-renders. All of its children re-render too, by default, even if their props didn't change.

Re-rendering is usually fast and fine. But if a child is **slow** (a big list, a heavy calculation), re-rendering it for no reason makes the whole app feel sluggish.

## useMemo: remember a calculation 🧮

`useMemo` caches the result of an expensive calculation and only recalculates when its inputs change:

```jsx
const visible = useMemo(
  () => items.filter((item) => item.includes(query)),   // the slow part
  [items, query],                                        // only redo when these change
);
```

Clicking an unrelated button no longer repeats the slow filter.

## React.memo: skip redrawing when nothing changed ⏭️

Wrapping a component in `memo` tells React: "if my props are the same as last time, reuse my previous result":

```jsx
import { memo } from "react";

const SlowList = memo(function SlowList({ items }) { ... });
```

## useCallback: keep the same function 🔗

There's a catch. Every render creates **new** functions, and a new function is never "the same" as the old one, so passing `onSelect={() => ...}` to a memoized child breaks `memo`. `useCallback` keeps the **same function** between renders:

```jsx
const handleSelect = useCallback((item) => setSelected(item), []);
```

## Measure first! 📏

`useMemo`, `memo` and `useCallback` add complexity, and they aren't free. Don't sprinkle them everywhere. Use them when something is **measurably slow**, like the logs you'll watch in this mission.

## Remember ✅

- `useRef` holds a value that survives re-renders without causing them; use it for DOM elements and counters.
- Components re-render when their state changes or their parent re-renders.
- `useMemo` caches calculations; `memo` skips re-rendering a component with the same props.
- `useCallback` keeps a function the same between renders, so `memo` keeps working. Optimize only what's slow.
