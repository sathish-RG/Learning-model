## Why does this matter?

Functional patterns (small, reusable functions combined like building blocks) are everywhere in modern JavaScript: React, Redux and countless utility libraries. And "implement `debounce`" is one of the most popular front-end interview questions of all.

## Higher-order functions: power tools with attachments 🔧

A **higher-order function** either takes a function as an input, or returns a new function. Think of a power drill: the drill is the same, but you snap in different attachments. You've already used them: `map`, `filter` and `reduce` take functions, and the closures from Lesson 34 return them.

## Pure functions and immutability 📸

- A **pure** function always gives the same output for the same input, and changes nothing outside itself.
- **Immutability** means never changing data in place. Make a changed **copy** instead, like photocopying a document and writing on the copy:

```js
const addItem = (list, item) => [...list, item];   // a new array; the original is untouched
```

Immutable data makes bugs easier to find, because nothing changes behind your back. (React relies on this!)

## pipe: an assembly line 🏭

`pipe` joins small functions into one, like stations on an assembly line. Each function's output becomes the next one's input:

```js
const pipe = (...fns) => (value) => fns.reduce((result, fn) => fn(result), value);

const shout = pipe(
  (s) => s.trim(),
  (s) => s.toUpperCase(),
  (s) => `${s}!`,
);
shout("  hello ");   // "HELLO!"
```

## curry: ordering a sandwich step by step 🥪

A **curried** function takes its arguments one at a time, like ordering a sandwich: first the bread, then the filling, then the sauce. Each step gives back a function waiting for the next:

```js
const volume = (l, w, h) => l * w * h;
const curriedVolume = curry(volume);
curriedVolume(2)(3)(4);   // 24
curriedVolume(2, 3)(4);   // 24
```

A general `curry` collects arguments until it has as many as the original function needs (`fn.length`), then calls it.

## debounce: the elevator door 🛗

An elevator door doesn't close the moment one person steps in. It **waits until people stop arriving**, then closes once. `debounce` delays a function until calls **stop** for a while, then runs it **once**, with the latest arguments:

```js
const search = debounce((query) => console.log("search:", query), 300);
search("j"); search("ja"); search("jav");
// 300ms after the LAST call: "search: jav" (only once)
```

It's perfect for search boxes: search once the user pauses typing, not on every keystroke. Under the hood, each call cancels the previous timer (`clearTimeout`) and starts a new one, with the timer living in a closure.

## throttle: a turnstile 🚇

A turnstile lets **one person through per interval**, no matter how hard the crowd pushes. `throttle` runs a function **at most once** per time window, ignoring the extra calls in between:

```js
const onScroll = throttle(() => console.log("scrolled"), 200);
```

It's perfect for scrolling, resizing and mouse movement, which can fire hundreds of times per second.

- **Debounce:** wait for quiet, then run once.
- **Throttle:** run regularly, but never too often.

## Remember ✅

- Higher-order functions take or return functions; pure functions have no side effects.
- Don't modify data: return changed copies with spread.
- `pipe` chains functions; `curry` takes arguments one at a time.
- `debounce` waits until the calls stop; `throttle` limits how often a function runs.
