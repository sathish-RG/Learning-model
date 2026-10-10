## Why does this matter?

Real apps spend a lot of time **waiting**: for data from the internet, for a timer, or for the user. JavaScript must keep the page responsive while it waits. This module covers how JavaScript handles waiting, plus a few tricks interviewers love to ask about.

## Destructuring: unpacking a suitcase 🧳

Instead of taking things out one at a time, unpack what you need in one go:

```js
const task = { title: "Buy milk", done: false };
const { title, done } = task; // two variables at once
```

## Spread and rest: the three dots `...`

**Spread** is like photocopying a list and adding a page. The original stays untouched:

```js
const newTasks = [...tasks, "Walk the dog"];
```

**Rest** does the opposite: it *gathers* leftover items into a list:

```js
function addAll(...numbers) {
  // numbers is a list of everything passed in
}
```

## Closures: a function's backpack 🎒

A function remembers the variables from the place where it was created, even after that place is gone. It's like a backpack it carries everywhere.

```js
function makeCounter() {
  let count = 0;
  return () => ++count; // remembers `count`
}

const next = makeCounter();
next(); // 1
next(); // 2
```

## Hoisting: reading the table of contents first 📖

Before running your code, JavaScript skims it and notes down your function names. That's why you can call a function **before** the line where it's written.

Variables made with `let` and `const` aren't ready until their line runs, so use them only after you create them.

## Promises: a restaurant buzzer 📟

You order food and get a buzzer. You don't stand at the counter. You sit down and chat, and the buzzer goes off when the food is ready. A **Promise** is that buzzer:

- **resolve**: "your food is ready!" ✅
- **reject**: "sorry, we ran out" ❌

```js
const order = new Promise((resolve) => {
  setTimeout(() => resolve("🍕"), 1000); // ready in 1 second
});
```

## Async/await: waiting politely ⏳

`await` means "pause **this** function until the buzzer goes off", while the rest of the page keeps working. It only works inside an `async` function. Use `try/catch` in case something goes wrong:

```js
async function getFood() {
  try {
    const food = await order;
    console.log(food);
  } catch (error) {
    console.log("Something went wrong");
  }
}
```

## The event loop: one chef, many orders 👨‍🍳

JavaScript is a chef who can only cook **one thing at a time**. Slow jobs (timers, internet requests) are handed to helpers. When a helper finishes, the result waits in a queue, and the chef picks it up once the current dish is done.

That's why this prints **A, C, B**:

```js
console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");
```

## call, apply and bind: borrowing a function

Inside a function, `this` means "who is doing the action." These three let you choose who that is:

- `call` borrows a function once
- `apply` is the same, but you pass the inputs as a list
- `bind` creates a copy that's permanently tied to someone

## Remember ✅

- `...` **spreads** a list out or **gathers** items in.
- A **closure** is a function that remembers where it was created.
- A **Promise** is a buzzer, and `await` waits for it without freezing the page.
- The **event loop** runs one thing at a time and handles finished slow jobs after.
