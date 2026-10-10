## Why does this matter?

Every programmer, including the most experienced, writes code that breaks. Users type unexpected things, servers go down, data arrives in the wrong shape. The difference between beginners and pros isn't avoiding errors; it's **handling them gracefully** and **finding bugs quickly**.

## Errors are smoke alarms 🚨

An error is a smoke alarm: loud and annoying, but far better than a silent fire. When something goes wrong, JavaScript **throws** an error and stops running that code. The message tells you what happened and where.

The common kinds:

| Error | What it means | Example |
|---|---|---|
| `SyntaxError` | The code (or data) isn't written correctly | a missing bracket, or `JSON.parse("not json")` |
| `ReferenceError` | You used a name that doesn't exist | a typo like `consle.log` |
| `TypeError` | You used a value in a way it can't be used | calling `.toUpperCase()` on `undefined` |
| `RangeError` | A number is out of the allowed range | `"ab".repeat(-1)` |

**Read the error message.** It names the problem, and the line number shows where to look.

## try / catch: a safety net 🎪

A trapeze artist works above a safety net. If they fall, the show goes on. `try` / `catch` is that net:

```js
try {
  const data = JSON.parse("not json");   // this throws
  console.log(data);                     // skipped
} catch (error) {
  console.log("Could not read the data:", error.message);
}
console.log("The program keeps going!");
```

- Code in `try` runs normally until something throws.
- If it throws, JavaScript jumps straight to `catch`, with the error in a variable.
- Every error has a `name` (like `"SyntaxError"`) and a `message`.

## finally: always clean up 🧹

`finally` runs **whether or not** there was an error. It's perfect for "always do this" steps, like hiding a loading spinner:

```js
try {
  riskyWork();
} catch (error) {
  console.log("Failed:", error.message);
} finally {
  console.log("Done trying.");
}
```

## throw: pulling the alarm yourself 🔔

You can raise your own errors when data doesn't make sense:

```js
function setAge(age) {
  if (age < 0) {
    throw new Error("Age can't be negative");
  }
  return age;
}
```

You can label your errors by setting a `name`, which makes them easy to tell apart in a `catch`:

```js
const error = new Error("Name is missing");
error.name = "ValidationError";
throw error;
```

## Debugging tools 🔍

- `console.log(value)`: check what a value really is at that moment.
- `console.error(message)`: logs in red, for problems.
- `console.table(arrayOfObjects)`: shows a list of objects as a neat table.
- **Rubber duck debugging:** explain your code, line by line, out loud (to a rubber duck, a pet or a friend). You'll often spot the bug halfway through explaining!

## Remember ✅

- Errors stop the code and explain what went wrong: read the name, message and line.
- `try` / `catch` handles errors so the program keeps running; `finally` always runs.
- `throw new Error("...")` raises your own error; set `error.name` to label it.
- Debug with `console.log`, `console.error`, `console.table`, and by explaining your code out loud.
