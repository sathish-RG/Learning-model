## Why does this matter?

Apps constantly turn raw data into friendly text: `₹1,250.00` instead of `1250`, `20 October 2026` instead of a timestamp, `ASHA` instead of `"  asha "`. Getting this formatting right is what makes an app feel polished.

## Strings: a necklace of letter beads 📿

A string is a necklace of letter beads. Each bead has a position (starting at **0**), and `.length` counts them:

```js
const word = "hello";
word[0];         // "h"
word.length;     // 5
```

Strings can't be changed in place. Every string method gives you a **new** string and leaves the original alone.

## Useful string methods ✂️

```js
"  pen  ".trim();               // "pen"         remove spaces at both ends
"pen".toUpperCase();            // "PEN"
"hello world".includes("world");   // true
"hello".startsWith("he");       // true
"javascript".slice(0, 4);       // "java"        from position 0 up to (not including) 4
"a,b,c".split(",");             // ["a", "b", "c"]   text → array
["a", "b"].join(" + ");         // "a + b"           array → text
"7".padStart(3, "0");           // "007"
```

## Template literals: fill-in-the-blanks forms 📝

Joining text with `+` gets messy fast. **Template literals** use backticks (`` ` ``) and `${ }` slots that you fill with any value or expression:

```js
const name = "Asha";
const items = 3;
console.log(`${name} bought ${items} books for ₹${items * 250}`);
// "Asha bought 3 books for ₹750"
```

## Numbers and their surprises 🔢

Computers store decimals in binary, so some sums come out slightly off:

```js
0.1 + 0.2;    // 0.30000000000000004 😮
```

This isn't a JavaScript bug; most languages do the same. For money, round when you **display** the number:

- `(0.1 + 0.2).toFixed(2)` gives `"0.30"`. Note that `toFixed` returns **text**.
- `Math.round(x)` rounds to the nearest whole number, `Math.floor(x)` rounds down, and `Math.ceil(x)` rounds up.
- `Math.max(3, 9, 4)` gives `9`, and `Math.min(...)` gives the smallest.
- `Math.random()` gives a random decimal between 0 and 1.
- `Number("42")` turns text into a number; it gives `NaN` ("not a number") if it can't.

## Money in any currency: Intl 💰

`Intl` (short for internationalization) formats numbers the way people expect in each country:

```js
const rupees = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });
rupees.format(125000);   // "₹1,25,000.00"
```

## Dates 📅

`new Date()` is the current date and time; `new Date("2026-10-20T10:30:00")` is a specific one.

```js
const d = new Date("2026-10-20T10:30:00");
d.getFullYear();   // 2026
d.getMonth();      // 9  ← months count from 0, so October is 9!

d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
// "20 October 2026"
```

`toLocaleDateString` with options is the easy, reliable way to show dates nicely.

## Remember ✅

- Strings are numbered from 0; methods like `trim`, `toUpperCase`, `slice` and `split` return new strings.
- Template literals: `` `Hello ${name}` ``.
- Decimals can be slightly off (`0.1 + 0.2`), so round for display with `toFixed` or `Math.round`.
- Use `Intl.NumberFormat` for money and `toLocaleDateString` for dates. Months start at 0!
