## Why does this matter?

Programs constantly make decisions: "Is the password correct?", "Is the cart empty?", "Did the player win?" Without decisions, a program would do exactly the same thing every time. Conditionals let your code choose a path.

## A fork in the road 🛣️

A conditional is a fork in the road. JavaScript checks a condition (something that's `true` or `false`) and takes one path or the other:

```js
const age = 20;

if (age >= 18) {
  console.log("Welcome in!");
} else {
  console.log("Sorry, adults only.");
}
```

Think of a doorman checking IDs: if you're 18 or over, you go in; otherwise, you don't.

## More than two paths: else if

Chain `else if` to check several conditions **in order**. JavaScript takes the **first** path whose condition is true, and skips the rest:

```js
const temperature = 32;

if (temperature > 35) {
  console.log("Stay indoors!");
} else if (temperature > 25) {
  console.log("Wear a hat.");
} else {
  console.log("Lovely weather.");
}
// Wear a hat.
```

Order matters: put the **most specific** checks first.

## Truthy and falsy: empty boxes 📦

`if` doesn't need a real `true` or `false`. It treats some values as "empty", which are called **falsy**:

- `false`, `0`, `""` (empty text), `null`, `undefined` and `NaN`

Everything else is **truthy**, even `"0"` and `"false"` (they're non-empty text). This is handy for checking whether something was filled in:

```js
const username = "";
if (username) {
  console.log("Hello, " + username);
} else {
  console.log("Please enter a name");
}
```

## The ternary: a quick question ❓

For a simple either/or value, the **ternary operator** fits on one line: `condition ? valueIfTrue : valueIfFalse`.

```js
const score = 72;
const result = score >= 60 ? "pass" : "fail";   // "pass"
```

Use it for short choices; use `if` for anything longer.

## switch: a vending machine 🥤

When one value can match many specific options, `switch` reads like a vending machine: press a button, get that item.

```js
const button = "B2";

switch (button) {
  case "A1":
    console.log("Chips");
    break;
  case "B2":
    console.log("Juice");
    break;
  default:
    console.log("Unknown button");
}
```

- Each `case` checks for an exact match (like `===`).
- **`break`** stops there. Forget it and JavaScript "falls through" into the next case!
- `default` runs when nothing matches.
- Several cases can share one result by stacking them: `case "sat": case "sun":`.

## Remember ✅

- `if` / `else if` / `else` picks the first path whose condition is true.
- Falsy values: `false`, `0`, `""`, `null`, `undefined`, `NaN`. Everything else is truthy.
- `condition ? a : b` chooses between two values in one line.
- `switch` matches one value against exact options; don't forget `break`.
