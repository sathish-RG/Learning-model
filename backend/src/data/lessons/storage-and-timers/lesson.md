## Why does this matter?

Two things make web apps feel real: **time** (countdowns, auto-save every few seconds, a message that disappears after a moment) and **memory** (your settings and unsaved work are still there tomorrow). This lesson covers both.

## setTimeout: an oven timer ⏲️

`setTimeout` is an oven timer: "do this **once**, after a delay".

```js
setTimeout(() => {
  console.log("Your pizza is ready! 🍕");
}, 2000);   // 2000 milliseconds = 2 seconds
```

The rest of your code doesn't wait. It keeps running, and the timer goes off later.

## setInterval: a metronome 🎵

`setInterval` is a metronome: "do this **again and again**, every so often". It gives back an **id**, which you use to stop it:

```js
let ticks = 0;
const id = setInterval(() => {
  ticks++;
  console.log("tick", ticks);
}, 1000);

// later:
clearInterval(id);   // stop the metronome
```

`clearTimeout(id)` cancels a `setTimeout` that hasn't gone off yet.

**Don't count the ticks to measure time.** Browsers can delay timers slightly, especially in background tabs, so after a few minutes your count would drift. Instead, remember **when you started** and compare:

```js
const startTime = Date.now();            // milliseconds since 1970
// inside the interval:
const elapsed = Date.now() - startTime;  // always accurate
```

## localStorage: a notebook the browser keeps 📓

`localStorage` is a small notebook that the browser keeps for your site. It survives **page reloads and even restarting the computer**.

```js
localStorage.setItem("theme", "dark");     // write
localStorage.getItem("theme");             // "dark"
localStorage.removeItem("theme");          // erase one entry
```

The notebook can only hold **text**. To store arrays or objects, pack them as JSON (Lesson 26!):

```js
const laps = ["00:05.2", "00:11.8"];
localStorage.setItem("laps", JSON.stringify(laps));                 // save

const saved = JSON.parse(localStorage.getItem("laps") || "[]");     // load
```

If nothing was saved yet, `getItem` returns `null`, so give `JSON.parse` a safe default like `"[]"`.

Things to know:

- **Each website has its own notebook.** Other sites can't read it.
- It's **not secure**: never store passwords or secret tokens in it.
- `sessionStorage` works the same way, but forgets everything when the tab closes.

## Formatting time 🕐

To show `1:05.3` as `01:05.3`, pad the numbers:

```js
const minutes = String(Math.floor(ms / 60000)).padStart(2, "0");
const seconds = String(Math.floor(ms / 1000) % 60).padStart(2, "0");
const tenths = Math.floor(ms / 100) % 10;
const text = `${minutes}:${seconds}.${tenths}`;   // "01:05.3"
```

## Remember ✅

- `setTimeout(fn, ms)` runs once later; `setInterval(fn, ms)` repeats. Stop them with `clearTimeout` / `clearInterval`.
- Measure time with `Date.now() - startTime`, not by counting ticks.
- `localStorage` stores text that survives reloads; use `JSON.stringify` / `JSON.parse` for arrays and objects.
- Never put secrets in `localStorage`.
