## Why does this matter?

Computers are brilliant at doing the same thing over and over without getting bored: sending 1,000 emails, adding up every price in a cart, checking every letter in a password. **Loops** are how you tell them to repeat.

## Running laps on a track 🏃

A loop is like running laps:

- You need to know **when to start** (lap 1),
- **when to stop** (after lap 5),
- and **how to count** each lap (add one).

That's exactly what a `for` loop says:

```js
for (let lap = 1; lap <= 5; lap++) {
  console.log("Lap", lap);
}
```

The three parts, separated by semicolons:

1. **Start:** `let lap = 1`, runs once at the beginning
2. **Keep going while:** `lap <= 5`, checked before every lap
3. **After each lap:** `lap++`, which adds one to the counter

The code inside `{ }` is the **body**: one lap.

## Building up a total ➕

A very common pattern is collecting a result as you go:

```js
let total = 0;
for (let n = 1; n <= 4; n++) {
  total += n;   // 1, then 3, then 6, then 10
}
console.log(total);   // 10
```

## while: keep going until... ⏳

Use `while` when you don't know in advance how many laps you'll need, only **when to stop**. Run until you're tired:

```js
let energy = 10;
let laps = 0;
while (energy > 0) {
  energy -= 3;
  laps++;
}
console.log(laps);   // 4
```

⚠️ **Make sure the condition eventually becomes false.** If `energy` never went down, the loop would run forever, like a treadmill with no off switch, and freeze the page.

## for...of: visiting each item 🏘️

`for...of` walks through each item of something one by one, like a postman visiting every house on a street. It works on text (letter by letter), and on lists, which you'll meet soon:

```js
for (const letter of "hey") {
  console.log(letter);   // h, then e, then y
}
```

## break and continue 🚦

- `break` **leaves the loop early**: stop running, you found what you needed.
- `continue` **skips the rest of this lap** and moves on to the next one.

```js
for (let n = 1; n <= 10; n++) {
  if (n % 2 === 0) continue;   // skip even numbers
  if (n > 7) break;            // stop completely after 7
  console.log(n);              // 1, 3, 5, 7
}
```

## Remember ✅

- `for (start; keep going while; after each lap) { ... }` repeats a counted number of times.
- Build totals with a variable outside the loop: `total += n`.
- `while (condition)` repeats until the condition is false; make sure it becomes false!
- `for...of` visits each item in turn; `break` stops, `continue` skips one lap.
