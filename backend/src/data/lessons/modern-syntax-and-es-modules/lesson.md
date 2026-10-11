## Why does this matter?

Open any modern codebase and you'll see `...`, `?.`, `??`, `{ name }` and `import` everywhere. These features make code shorter, safer and easier to organize. This lesson turns older-style code into the JavaScript professionals write today.

## Destructuring: unpacking a suitcase 🧳

Instead of taking things out one at a time, unpack everything you need in one line:

```js
const user = { name: "Asha", age: 24 };
const { name, age } = user;              // two variables at once

const colors = ["red", "green", "blue"];
const [first, second] = colors;          // "red", "green"
```

You can rename and set defaults while unpacking: `const { name: userName, role = "student" } = user;`

## Spread and rest: the three dots `...`

The same three dots do two opposite jobs:

- **Spread** *unpacks* a list, like emptying a bag onto the table:

  ```js
  const more = [...numbers, 10, 20];        // copy and add
  Math.max(...numbers);                     // pass each item as an argument
  const updated = { ...user, age: 25 };     // copy an object, change one thing
  ```

- **Rest** *gathers* the leftovers into a list, like sweeping crumbs into a pile:

  ```js
  function sum(...nums) {                   // all the arguments, as an array
    return nums.reduce((total, n) => total + n, 0);
  }
  ```

## Optional chaining ?.: a careful explorer 🔦

Reading `user.address.city` crashes if `address` is `null`. `?.` checks each door before walking through it, and stops quietly with `undefined` if a door is missing:

```js
user.address?.city;        // undefined instead of a crash
user.getPhone?.();         // only calls the function if it exists
```

## Nullish coalescing ??: a backup only when there's nothing 🛟

`??` gives a fallback value **only** when the left side is `null` or `undefined`:

```js
const volume = settings.volume ?? 50;
```

Why not `||`? Because `||` also replaces perfectly good values like `0` and `""`:

```js
0 || 50;    // 50 ❌ a volume of 0 was a real choice!
0 ?? 50;    // 0  ✅
```

`?.` and `??` work beautifully together: `user.address?.city ?? "Unknown"`.

## Shorthand properties ✂️

When a variable has the same name as the property, write it once:

```js
const name = "Asha", age = 24;
const user = { name, age };      // same as { name: name, age: age }
```

## Modules: separate rooms 🚪

As projects grow, one giant file becomes a mess. **Modules** split code into files, like rooms in a house, each with one purpose. A file **exports** what it wants to share (putting it on the shelf), and other files **import** it (taking it off the shelf):

```js
// utils.js
export function sum(...nums) { ... }          // a named export
export default function formatUser(user) { ... }  // the file's main (default) export

// index.js
import formatUser, { sum } from "./utils.js";
```

- **Named exports:** many per file, imported by their exact names in `{ }`.
- **Default export:** at most one per file, imported with any name you like.
- In the browser, imports need the file extension: `"./utils.js"`.

## Remember ✅

- Destructuring unpacks objects and arrays into variables.
- `...` spreads (unpacks) or rests (gathers).
- `?.` stops safely at `null`/`undefined`; `??` falls back only for `null`/`undefined`.
- `export` shares code from a file; `import` uses it in another.
