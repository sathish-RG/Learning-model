## Your mission: build your own utility toolbox

Write each helper yourself (no libraries!), then test it.

1. **Immutability.** Write `addItem(list, item)` that returns a **new** array with the item added. Log `addItem(fruits, "cherry")`, then log `fruits` to prove it didn't change.
2. **pipe.** Write `pipe(...fns)`. Use it to build `shout` from three steps: trim, uppercase, add `"!"`. Log `shout("  hello ")`.
3. **curry.** Write a general `curry(fn)` that keeps collecting arguments until it has `fn.length` of them. Log `curry(volume)(2)(3)(4)` and `curry(volume)(2, 3)(4)`.
4. **debounce.** Write `debounce(fn, ms)`. Create `search = debounce((q) => console.log("search:", q), 200)`, then call `search("j")`, `search("ja")` and `search("jav")` straight after each other. Only `search: jav` should appear.
5. **throttle.** Write `throttle(fn, ms)` that runs `fn` at most once every `ms` milliseconds (run the first call straight away). The starter calls a throttled logger every 50ms for half a second.

✅ **You're done when** the console shows:
- `["apple", "banana", "cherry"]`, then `["apple", "banana"]`
- `HELLO!`, `24`, `24`
- a few `tick` lines about 200ms apart, starting with `tick 1` (not 10 of them)
- and, somewhere among the ticks, `search: jav` exactly once
