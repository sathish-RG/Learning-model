## Your mission: modernize old code

`index.js` is written in an older style. Rewrite each part with modern syntax, keeping the same results. There are **two editable files**: `index.js` and `utils.js`.

1. **Destructure.** Replace the separate `var` lines with one destructuring line that gets `name` and `settings` from `user`, then log `name`.
2. **?. and ??.** Rewrite `city` using `?.` and `??`, so it's `"Unknown"` when there's no address. Rewrite `volume` using `??` with a default of `50`. Log both.
3. **0 is a real value.** Log `muted.volume || 50`, then `muted.volume ?? 50`. See the difference!
4. **Spread.** Rewrite `max` with `Math.max(...numbers)` and `more` with array spread. Log both.
5. **Object spread.** Rewrite `copy` with object spread. Log `copy.name`, then `user.name` to prove the original didn't change.
6. **Modules.** Move `sum` into `utils.js` as a **named export**, rewritten with a rest parameter. Make `formatUser({ name, age })` (with destructured parameters, returning `NAME (AGE)`) the **default export**. Import both in `index.js`, then log `sum(1, 2, 3)` and `formatUser(user)`.

✅ **You're done when** the console shows `Asha`, `Unknown`, `50`, `50`, `0`, `7`, `[3, 7, 1, 10, 20]`, `Ravi`, `Asha`, `6` and `Asha (24)`.
