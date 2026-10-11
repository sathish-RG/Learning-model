## Why does this matter?

Closures are behind private data, event handlers, React hooks and countless interview questions ("What does this loop print?"). Once closures click, a lot of "magic" JavaScript suddenly makes sense.

## Closures: a function's backpack 🎒

When a function is created, it packs a **backpack** with the variables around it. Wherever the function goes, even after the place it was born has gone, it still carries that backpack:

```js
function makeGreeter(greeting) {
  return (name) => `${greeting}, ${name}!`;   // packs `greeting` in its backpack
}

const hello = makeGreeter("Hello");
const namaste = makeGreeter("Namaste");

hello("Asha");     // "Hello, Asha!"
namaste("Ravi");   // "Namaste, Ravi!"
```

`makeGreeter` finished running long ago, but each returned function still remembers **its own** `greeting`. That remembered environment is a **closure**.

## Private data with closures 🔒

Nobody can reach inside a backpack except its owner. That makes closures perfect for **private** variables:

```js
function makeCounter() {
  let count = 0;                       // private: only the functions below can see it
  return {
    increment: () => ++count,
    value: () => count,
  };
}

const counter = makeCounter();
counter.increment();   // 1
counter.count;         // undefined: there's no way in from outside!
```

Every call to `makeCounter()` packs a **new** backpack, so two counters never share a count.

## Function factories 🏭

A function that builds and returns other functions is a **factory**:

```js
const makeMultiplier = (factor) => (n) => n * factor;
const double = makeMultiplier(2);
double(5);   // 10
```

## The classic loop bug 🐛

A favourite interview question:

```js
for (var i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// prints 4, 4, 4 😮
```

`var` creates **one** shared variable for the whole loop. By the time the timeouts run, the loop has finished and `i` is `4`. All three functions carry the *same* backpack.

`let` creates a **fresh** variable for every lap, so each function packs its own:

```js
for (let i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// prints 1, 2, 3 ✅
```

## Hoisting: reading the table of contents first 📖

Before running your code, JavaScript skims the whole file, like reading a book's table of contents, and notes down what's declared:

- **Function declarations** are hoisted completely, so you can call them *before* their line:

  ```js
  greet();                 // works!
  function greet() { console.log("hi"); }
  ```

- **`var`** is hoisted but left empty, so it's `undefined` until its line runs.
- **`let` and `const`** are noted, but you can't touch them before their line. Doing so throws a `ReferenceError`. This gap is called the **temporal dead zone**: the box has been ordered but not delivered yet.

The lesson: **declare things before you use them**, and prefer `let` and `const`.

## Remember ✅

- A closure is a function plus the backpack of variables from where it was created.
- Closures give you private data and function factories.
- `var` shares one variable across a loop; `let` creates a new one per lap.
- Function declarations are hoisted fully, `var` is hoisted as `undefined`, and `let`/`const` can't be used before their line.
