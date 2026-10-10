## Why does this matter?

HTML builds the page and CSS decorates it, but neither can **think**. JavaScript is the brain: it remembers things, does maths, makes decisions and reacts to people. Every app you use, from WhatsApp to Instagram, runs on logic like this.

In this phase there's no web page to look at. You'll write pure logic and see the results in the **console**, the panel next to the editor.

## console.log: talking out loud 🗣️

`console.log()` prints whatever you give it into the console. It's how programmers check what their code is doing, like thinking out loud:

```js
console.log("Hello!");          // Hello!
console.log(2 + 3);             // 5
console.log("Total:", 500);     // Total: 500  (several values, separated by commas)
```

Each `console.log` prints one line, with its values separated by spaces. Text inside a list or object is shown in quotes, like `["apple", "banana"]`, so you can tell text from numbers. Anything after `//` on a line is a **comment**, a note for humans that JavaScript ignores.

## Variables: labeled storage boxes 📦

A variable is a box with a label on it. You put a value inside and use the label to get it back:

```js
const shopName = "Book Nook";
let itemsInCart = 0;
```

- `const` is a box that's **taped shut**: you can't put something else in it later.
- `let` is a box you can **open and refill**: `itemsInCart = 3;`

**Use `const` by default**, and `let` only when the value really needs to change. (You may see `var` in old code. It's the outdated way, so don't use it.)

Names can't have spaces, so we join words with capitals: `itemsInCart`. This style is called **camelCase**.

## Types: what's inside the box? 🔍

| Type | Example | What it is |
|---|---|---|
| String | `"Book Nook"` | Text, always in quotes |
| Number | `42`, `9.99` | Any number, whole or decimal |
| Boolean | `true`, `false` | Yes or no |
| Undefined | `undefined` | A box that was never filled |
| Null | `null` | A box deliberately left empty |

`typeof` tells you what's in a box: `typeof "hi"` gives `"string"`.

## Operators: doing maths 🧮

```js
10 + 3    // 13   add
10 - 3    // 7    subtract
10 * 3    // 30   multiply
10 / 4    // 2.5  divide
10 % 3    // 1    remainder: what's left after sharing equally
2 ** 3    // 8    power (2 × 2 × 2)
```

**Shortcuts** change a `let` variable: `count += 3` means `count = count + 3`, and `count++` adds one.

## The text-and-number trap ⚠️

`+` means "add" for numbers but "**join**" for text. If either side is text, JavaScript joins them:

```js
5 + 3        // 8
"5" + 3      // "53"   ← joined, not added!
"5" * 3      // 15     (only + joins; other operators turn text into numbers)
```

Values typed into forms always arrive as **text**, so this bug is very common. The fix is to turn text into a number first: `Number("5") + 3` gives `8`.

## Comparing values ⚖️

```js
5 > 3          // true
5 === 5        // true:  same value AND same type
5 === "5"      // false: a number is not text
5 == "5"       // true:  == quietly converts types first
5 !== 3        // true:  "not equal"
```

**Always use `===` and `!==`.** The loose `==` converts types behind your back, which causes confusing bugs.

**Combine conditions** with `&&` (and), `||` (or) and `!` (not):

```js
const isAdult = age >= 18 && hasId;
```

## Remember ✅

- `console.log()` prints values to the console.
- `const` for boxes that stay the same, `let` for boxes that change.
- The main types are strings, numbers, booleans, `undefined` and `null`; `typeof` tells you which.
- `+` joins text, so convert text with `Number()` first. Compare with `===`, never `==`.
