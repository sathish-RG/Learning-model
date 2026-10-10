## Your mission: a parser that never crashes

`parseUser` turns JSON text into a sentence, but one bad input crashes everything. Make it robust.

1. **See the crash.** Look at the console: the second input isn't valid JSON, and the whole program stops.
2. **Catch it.** Inside the loop, wrap the call in `try` / `catch`. When it fails, use `console.error` to log `` `Input ${number} failed: ${error.name}: ${error.message}` `` (inputs are numbered from 1).
3. **Validate.** Inside `parseUser`, after parsing:
   - if `data.name` is empty or missing, throw an `Error` with the message `"Name is missing"` and the `name` `"ValidationError"`
   - if `data.age` is missing, throw the same kind of error with the message `"Age is missing"`
4. **Always report.** Add a `finally` that logs `` `Checked input ${number}` ``.
5. **Keep the good ones.** Push every successful result into the `valid` array, and after the loop log it with `console.table(valid)`.

✅ **You're done when** the program runs to the end:
- input 1 succeeds
- input 2 fails with a `SyntaxError`
- input 3 fails with `ValidationError: Age is missing`
- input 4 fails with `ValidationError: Name is missing`
- every input logs `Checked input …`
- a table shows the one valid user
