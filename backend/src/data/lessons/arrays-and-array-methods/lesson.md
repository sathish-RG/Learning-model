## Why does this matter?

Real apps deal with **lists**: tasks in a to-do app, products in a shop, messages in a chat. Arrays hold lists, and array methods let you search, sort, filter and transform them in a single line. You'll use these every single day as a developer.

## A row of numbered lockers 🔢

An array is a row of lockers, each holding one item. Lockers are numbered from **0**, not 1:

```js
const fruits = ["apple", "banana", "cherry"];

fruits[0];        // "apple"   (the first locker is number 0!)
fruits[2];        // "cherry"
fruits.length;    // 3
```

## Adding and removing 📥📤

Think of a stack of plates:

- `push(item)` adds to the **end**; `pop()` removes from the end.
- `unshift(item)` adds to the **start**; `shift()` removes from the start.

```js
const plates = ["red", "blue"];
plates.push("green");   // ["red", "blue", "green"]
plates.pop();           // removes "green"
```

`includes("blue")` tells you whether an item is in the array (`true` or `false`), and `indexOf("blue")` tells you its locker number.

## Methods that do the looping for you 🔁

These methods take a small **function** (often an arrow function) and run it on each item. Most of them give back a **new array** and leave the original untouched.

### map: a factory machine 🏭

`map` puts every item through a machine and gives you a new array of the results:

```js
const prices = [100, 250, 40];
const doubled = prices.map((price) => price * 2);   // [200, 500, 80]
```

### filter: a sieve 🥣

`filter` keeps only the items that pass a test:

```js
const cheap = prices.filter((price) => price < 200);   // [100, 40]
```

### find: a search party 🔦

`find` returns the **first** item that passes the test, or `undefined` if none do:

```js
const firstBig = prices.find((price) => price > 200);   // 250
```

### reduce: a snowball ⛄

`reduce` rolls through the array, building up a single result, like a snowball growing as it rolls down a hill:

```js
const total = prices.reduce((sum, price) => sum + price, 0);   // 390
```

The `0` is the starting snowball. On each step, `sum` is the snowball so far and `price` is the next item to roll over.

### forEach: just do something

`forEach` runs code for each item but gives nothing back. It's good for logging:

```js
prices.forEach((price) => console.log(price));
```

## Sorting, with one trap ⚠️

`sort()` sorts items **as text** by default, so `[3, 25, 100].sort()` gives `[100, 25, 3]` (because the text "1" comes before "2" and "3")! For numbers, give it a compare function:

```js
const sorted = prices.slice().sort((a, b) => a - b);   // smallest first
```

`sort` also **changes the original array**. `slice()` makes a copy first, so the original stays safe.

## Remember ✅

- Arrays are numbered lockers starting at **0**; `.length` counts the items.
- `push`/`pop` work at the end, `unshift`/`shift` at the start.
- `map` transforms, `filter` keeps some, `find` gets the first match, `reduce` builds one result.
- Sort numbers with `(a, b) => a - b`, on a copy made with `slice()`.
