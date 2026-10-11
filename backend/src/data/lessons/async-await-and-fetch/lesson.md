## Why does this matter?

Almost every app loads data from somewhere: your profile, your messages, the weather, your tasks. **`fetch`** asks a server for data, and **`async`/`await`** lets you write the waiting part as if it were ordinary step-by-step code. This is how front-ends talk to back-ends, including the one you'll build in Phase 7.

## async/await: waiting politely in line 🧍

In the last lesson you chained `.then` calls. `async`/`await` does the same thing, but reads like a normal recipe:

```js
async function showUser() {
  const user = await loadUser(1);   // wait here until the promise is fulfilled...
  console.log(user.name);           // ...then carry on
}
```

- `await` pauses **this function only** until the promise settles. The rest of the page keeps working, like waiting politely in a queue while the shop keeps serving others.
- `await` only works inside an `async` function (or at the top level of a module).
- An `async` function always returns a promise.

## Errors: try / catch / finally 🛟

If an awaited promise is rejected, it **throws**, so the safety net from Phase 3 works naturally:

```js
async function showUser() {
  try {
    const user = await loadUser(99);
    console.log(user.name);
  } catch (error) {
    console.log("Could not load:", error.message);
  } finally {
    console.log("Finished trying");   // runs either way: hide the spinner here
  }
}
```

## fetch: ordering a delivery 📦

`fetch(url)` asks a server for something. It's like ordering a delivery, and it happens in two steps:

```js
const response = await fetch("./data/tasks.json");   // 1. the box arrives
const tasks = await response.json();                  // 2. open the box and read the contents
```

1. `fetch` gives you a **response**: the delivery box, with a label saying how it went (`status`).
2. `response.json()` opens the box and reads the JSON inside. It's *also* asynchronous, so it needs `await` too.

## The trap: a 404 is not an error to fetch! ⚠️

`fetch` only rejects if the request **couldn't happen at all** (for example, you're offline). If the server answers "404 Not Found" or "500 Server Error", that's still a delivered box: just one containing bad news. **You** have to check the label:

```js
const response = await fetch(url);
if (!response.ok) {                              // ok is true for statuses 200–299
  throw new Error(`HTTP ${response.status}`);
}
```

Forgetting this check is one of the most common bugs in real apps.

## Loading and error states 🔄

Good apps always tell people what's happening:

1. **Before:** show "Loading…" (and disable the button, so it isn't clicked twice).
2. **Success:** show the data.
3. **Failure:** show a friendly message.
4. **Either way:** remove the loading message and re-enable the button. That's a job for `finally`.

## Promise.all: ordering from several shops at once 🛍️

Awaiting two requests one after the other means waiting twice as long. `Promise.all` starts them **at the same time** and waits for **all** of them:

```js
const [tasks, users] = await Promise.all([
  getJson("./data/tasks.json"),
  getJson("./data/users.json"),
]);
```

If any one of them fails, the whole `Promise.all` rejects, straight into your `catch`.

## Remember ✅

- `await` pauses an `async` function until a promise settles; handle failures with `try`/`catch`/`finally`.
- `fetch` → `response` → `await response.json()`.
- `fetch` doesn't throw on 404 or 500: always check `response.ok`.
- Show loading and error states; use `Promise.all` to load things in parallel.
