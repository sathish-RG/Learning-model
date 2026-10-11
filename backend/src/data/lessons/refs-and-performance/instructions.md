## Your mission: focus, count and stop wasted renders

`App.jsx` is yours; `SlowList.jsx` is locked. It logs `SlowList rendered` every time it draws, so you can watch it in the console.

1. **Focus with a ref.** Create `inputRef` with `useRef`, attach it to the search input, and make the `Focus search` button call `inputRef.current.focus()`.
2. **Count renders, quietly.** Create `renders = useRef(0)`, add 1 to `renders.current` on every render, and show it in `#renders`.
3. **See the waste.** Click `Like` a few times. Every click logs `SlowList rendered`, even though the list didn't change!
4. **useMemo.** Wrap the filtering (`allItems.filter(...)`) in `useMemo` with `[query]` as the dependency.
5. **memo + useCallback.** `SlowList` is already wrapped in `memo`, but it still re-renders, because `onSelect` is a new function each time. Wrap `handleSelect` in `useCallback` (with `[]`).

✅ **You're done when** `Focus search` puts the cursor in the box; and after the first load, clicking `Like` **no longer** logs `SlowList rendered`, while typing in the search box still does.
