## Your mission: watch a component live and leave

Two files: `App.jsx` (the parent) and `Timer.jsx` (the child). `api.js` is locked: it pretends to be a slow server.

1. **Mount and unmount.** In `Timer.jsx`, add an effect with `[]` that logs `Timer mounted`, and returns a cleanup that logs `Timer unmounted`. Click `Show / hide timer` in the preview to watch it come and go.
2. **A ticking timer.** In the same effect, start a `setInterval` that adds 1 to `seconds` every second (use the updater form: `setSeconds((s) => s + 1)`). In the cleanup, stop it with `clearInterval`.
3. **React to a change.** In `App.jsx`, add an effect that depends on `count`. It sets `document.title` to `Clicked N times` and logs `title updated: N`.
4. **Load data on mount.** In `App.jsx`, add an effect with `[]` that calls `fetchUsers()` (from `api.js`), then saves the result in `users` state. Use the `ignore` flag from the lesson, so a late response is ignored after unmounting. Show the names in `#users`, joined with commas, and `Loading users…` until they arrive.

✅ **You're done when:**
- the console shows `Timer mounted` once
- the timer counts up every second
- hiding it logs `Timer unmounted`, and showing it again starts it from 0
- each click logs `title updated: N`
- `Asha, Ravi, Meera` appears after a short loading message
