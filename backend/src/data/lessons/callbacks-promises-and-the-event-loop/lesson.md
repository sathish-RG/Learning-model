## Why does this matter?

Loading data, waiting for a timer, reading a file: these things take time, and JavaScript must not freeze while it waits. Understanding how JavaScript juggles waiting (callbacks, promises and the event loop) is essential for real apps, and a classic interview topic ("What order do these logs appear in?").

## The event loop: one chef in a busy kitchen 👨‍🍳

JavaScript is a **single chef** who can only cook **one dish at a time**:

- **The call stack** is the chef's hands: whatever the chef is doing *right now*.
- **Slow jobs** (timers, network requests) are handed to **kitchen helpers** (the browser), so the chef doesn't stand around waiting.
- When a helper finishes, they put the result on the **pass** (a queue).
- The chef only picks up the next plate when their hands are **completely free**.

There are two queues at the pass:

- **Microtasks** (promise callbacks): the **VIP queue**, always served first.
- **Tasks** (like `setTimeout`): the regular queue.

```js
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");
// A, D, C, B
```

`A` and `D` run immediately. Then, with the chef's hands free, the VIP queue (`C`) goes before the regular queue (`B`), even though the timer was set to `0`ms!

## Callbacks: "call me back when it's done" 📞

The oldest way to handle waiting is passing a function to be **called back** later:

```js
loadUserCb(1, (error, user) => {
  if (error) return console.log(error.message);
  console.log(user.name);
});
```

It works, but doing several steps in a row means nesting callbacks inside callbacks inside callbacks. This sideways pyramid is called **callback hell**.

## Promises: a restaurant buzzer 📟

A **Promise** is a buzzer you get when you order. It's in one of three states:

- **pending**: still cooking
- **fulfilled**: your food is ready (it has a value)
- **rejected**: something went wrong (it has an error)

You say what to do when it buzzes with `.then` (success), `.catch` (failure) and `.finally` (either way):

```js
loadUser(1)
  .then((user) => console.log(user.name))
  .catch((error) => console.log(error.message))
  .finally(() => console.log("Done"));
```

## Making your own Promise 🛠️

`new Promise` gives you two buttons: `resolve` (success) and `reject` (failure). Press one when the work is done:

```js
function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

wait(1000).then(() => console.log("One second later"));
```

## Promisifying: upgrading old callback code ⬆️

You can wrap any callback-style function in a Promise:

```js
function loadUser(id) {
  return new Promise((resolve, reject) => {
    loadUserCb(id, (error, user) => {
      if (error) reject(error);
      else resolve(user);
    });
  });
}
```

## Chaining: one step after another ⛓️

Each `.then` can return a value, or **another promise**. The next `.then` waits for it, so steps run in order without nesting:

```js
wait(100)
  .then(() => loadUser(2))       // return a promise...
  .then((user) => console.log(user.name));   // ...and the next step waits for it
```

## Remember ✅

- One chef: synchronous code first, then microtasks (promises), then tasks (timers).
- Callbacks work, but nesting them gets messy.
- A Promise is pending, then fulfilled or rejected; handle it with `.then`, `.catch` and `.finally`.
- Create promises with `new Promise((resolve, reject) => ...)`, and chain steps by returning promises from `.then`.
