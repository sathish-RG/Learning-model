## Your mission: closures in action

All output goes to the console.

1. **A private counter.** Write `makeCounter()`. It keeps a private `count` and returns an object with `increment()`, `decrement()` and `value()`.
   - Create two counters, `a` and `b`.
   - Increment `a` twice and `b` once.
   - Log `a.value()` and `b.value()`: they're independent!
2. **Proof of privacy.** Log `a.count`. It should be `undefined`.
3. **A factory.** Write `makeMultiplier(factor)` that returns a function multiplying a number by `factor`. Create `double` and `triple`, then log `double(5)` and `triple(5)`.
4. **Fix the loop bug.** The starter's `var` loop prints `var: 4` three times. Below it, write the same loop with `let`, logging `let:` and `i`, so it prints 1, 2 and 3.
5. **Hoisting.** Call `shout("hoisting works")` **above** the line where `shout` is declared (the declaration is at the bottom of the file), and log it.

✅ **You're done when** the console shows `2`, `1`, `undefined`, `10`, `15`, `HOISTING WORKS!`, then (after a moment) `var: 4` three times, then `let: 1`, `let: 2`, `let: 3`.
