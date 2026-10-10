## Why does this matter?

HTML and CSS build a page that just *sits there*, like a poster. **JavaScript is the brain.** When you click "Add task" and a new task appears, that's JavaScript at work. Every interactive website uses it.

## Variables: labeled storage boxes 📦

A variable is a box with a name written on it. You put a value inside and use the name to get it back later.

```js
let taskCount = 3;
const appName = "Task Manager Pro";
```

- `let` is a box you can **open and change** later: `taskCount = 4;`
- `const` is a box that's **taped shut**. Its value stays the same.

Tip: use `const` by default, and `let` only when the value needs to change.

## Data types: what's in the box?

Boxes can hold different kinds of things:

- **Text** (called a *string*) goes in quotes: `"Buy milk"`
- **Numbers**: `42`
- **Yes/no** (called a *boolean*): `true` or `false`

## Functions: recipes 🍳

A function is a recipe. You write the steps **once**, then use it as many times as you like. It can take ingredients (*inputs*) and hand back a result with `return`.

```js
function greet(name) {
  return "Hi, " + name + "!";
}

greet("Sam"); // "Hi, Sam!"
```

## Arrays: lists 📝

An array is a list, like a shopping list. Each item has a position number, and **counting starts at 0**.

```js
const tasks = ["Buy milk", "Walk the dog"];
tasks[0];      // "Buy milk"
tasks.length;  // 2
```

Arrays come with handy tools. `.filter()` works like a sieve: it keeps only the items that pass your test.

```js
const numbers = [1, 5, 8, 12];
numbers.filter((n) => n > 6); // [8, 12]
```

## Objects: ID cards 🪪

An object groups related facts together, like an ID card with labels and values.

```js
const task = { title: "Buy milk", done: false };
task.title; // "Buy milk"
```

An array of objects is how most apps store lists of things, including your tasks.

## The DOM: a remote control for the page 🎮

The **DOM** is the web page as JavaScript sees it. JavaScript can grab any part of the page and change it:

```js
const app = document.getElementById("app");
app.innerHTML = "<h1>Hello!</h1>";
```

## Remember ✅

- **Variables** are labeled boxes: `const` stays the same, `let` can change.
- **Functions** are reusable recipes that `return` a result.
- **Arrays** are lists (starting at 0), **objects** are labeled facts.
- `.filter()` keeps only the items that pass a test.
