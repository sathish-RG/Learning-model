## Your mission: from callbacks to promises

All output goes to the console. Do one small step at a time.

1. **Predict the order.** Before running, read the A/B/C/D code in the starter and write the order you expect in the comment. Then check the console. Were you right?
2. **A timer promise.** Write `wait(ms)`: it returns a `new Promise` that resolves after `ms` milliseconds (*hint:* `setTimeout(resolve, ms)`).
3. **Promisify.** Write `loadUser(id)`: it returns a `new Promise` that calls `loadUserCb`. **Reject** if there's an error, otherwise **resolve** with the user.
4. **Use it.**
   - Call `loadUser(1)`, and with `.then` log `"Loaded:"` and the user's name.
   - Call `loadUser(99)`, and with `.catch` log `"Error:"` and the error's message.
5. **Chain.** Call `wait(100)`, then (in a `.then`) **return** `loadUser(2)`, then log `"Loaded:"` and that user's name. End the chain with `.finally` logging `"Done"`.

✅ **You're done when** the console shows `A`, `D`, `C`, `B`, then `Loaded: Asha`, `Error: User 99 not found`, `Loaded: Ravi` and `Done`.
