## Your mission: master `this`

All output goes to the console.

1. **Before the dot.** Call `player.addPoint()` twice, logging the result each time.
2. **A permanent name tag.** Taking `addPoint` off the object loses `this` (see the comment in the starter). Create `boundAdd` with `bind`, call it, and log the result.
3. **A callback that keeps `this`.** Use `setTimeout` with an **arrow function** that logs `"later:"` and the result of `player.addPoint()`.
4. **Borrow a function.** Log `introduce.call(player, "Hi", "!")`, then `introduce.apply` with the object `{ name: "Ravi" }` and the array `["Hello", "."]`.
5. **A shared recipe book.** Add a `speak` method to `Animal.prototype` that returns `NAME makes a sound`. Create `cat` (`"Milo"`) and `dog` (`"Rex"`), then log:
   - `cat.speak()`
   - `cat.speak === dog.speak`
   - `Object.getPrototypeOf(cat) === Animal.prototype`

✅ **You're done when** the console shows `1`, `2`, `3`, `Hi, I'm Asha!`, `Hello, I'm Ravi.`, `Milo makes a sound`, `true`, `true`, then `later: 4`.
