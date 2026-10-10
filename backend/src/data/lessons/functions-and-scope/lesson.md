## Why does this matter?

So far your code has run straight from top to bottom. As programs grow, you'll want to **reuse** pieces: calculate a price, format a name, check a password, in many places. **Functions** let you write something once and use it everywhere.

## Recipes 🍳

A function is a **recipe**:

- It has a **name** (`makeTea`).
- It takes **ingredients**, called **parameters**.
- It follows **steps** (the code inside).
- It produces a **dish**, the value it **returns**.

```js
function makeTea(sugar) {
  return "Tea with " + sugar + " spoons of sugar";
}

console.log(makeTea(2));   // "Tea with 2 spoons of sugar"
```

Writing the recipe doesn't make tea. **Calling** it does: `makeTea(2)`. The `2` you pass in is called an **argument**.

## return: handing over the dish 🍽️

`return` sends a value back to whoever called the function, and **ends** the function immediately. A function without `return` gives back `undefined`, like a recipe that cooks but never serves.

```js
function add(a, b) {
  return a + b;
}

const total = add(2, 3);   // 5: the returned value is stored
```

**Return values; don't just log them.** A function that returns can be reused anywhere: in another calculation, a condition, or a log.

## Default parameters

Give a parameter a fallback for when it isn't passed, like "if no sugar is mentioned, use 1 spoon":

```js
function greet(name = "friend") {
  return "Hello, " + name + "!";
}

greet("Asha");   // "Hello, Asha!"
greet();         // "Hello, friend!"
```

## Arrow functions: the sticky-note version 📝

Arrow functions are a shorter way to write the same thing. When the body is a single expression, you can even drop `return` and the braces:

```js
const double = (n) => n * 2;

const greetLoudly = (name) => {
  const message = "HELLO, " + name;
  return message;
};
```

## Scope: rooms in a house 🏠

Variables created **inside** a function only exist inside it, like things left in the kitchen. The rest of the house can't see them:

```js
function makeSandwich() {
  const bread = "brown";
  return bread + " sandwich";
}

console.log(bread);   // ❌ ReferenceError: bread is not defined
```

But a function **can see variables outside it**, like looking out of the kitchen window into the garden:

```js
const shopName = "Book Nook";

function welcome() {
  return "Welcome to " + shopName;   // ✅ can see the outer variable
}
```

To get a value **out** of a function, `return` it.

## Pure functions ✨

The best functions are **pure**: the same inputs always give the same output, and they don't change anything outside themselves. They're easy to test and impossible to "break by accident".

## Remember ✅

- A function is a recipe: parameters go in, `return` hands a value back.
- Define once, call many times: `add(2, 3)`.
- Default parameters give fallbacks; arrow functions are a shorter syntax.
- Variables inside a function stay inside (scope). Use `return` to get values out.
