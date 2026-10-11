## Your mission: a command-line tip calculator

Two files: `app.js` (the program) and `tip.js` (your own module). This sandbox has no terminal, so it runs your program for you as `node app.js 1200 15`: a ₹1200 bill with a 15% tip. The console below is your terminal.

1. **Your module.** In `tip.js`, write two functions and export both with `module.exports`:
   - `calculateTip(bill, percent)` returns the tip: `bill * percent / 100`
   - `formatMoney(amount)` returns the amount as rupees with 2 decimals, e.g. `formatMoney(180)` → `"₹180.00"` (hint: `toFixed(2)`)
2. **Import it.** In `app.js`, load both functions with `require("./tip")`, and load the built-in `os` module.
3. **Where am I running?** Print `Node VERSION on PLATFORM`, using `process.version` and `os.platform()`.
4. **Read the arguments.** Take the two values after `node app.js` from `process.argv`, and turn them into numbers.
5. **Bad input?** If either number is missing or not a number (`Number.isNaN`), print `Usage: node app.js <bill> <tip-percent>` with `console.error`, and set `process.exitCode = 1`.
6. **Otherwise, print the bill.** Exactly these three lines:

```
Bill: ₹1200.00
Tip (15%): ₹180.00
Total: ₹1380.00
```

💡 Want to see your usage message? Temporarily replace `process.argv.slice(2)` with `["abc"]`, then change it back.

✅ **You're done when** the console shows `$ node app.js 1200 15`, then a `Node … on …` line (like `Node 16.15.1 on linux`), then the three lines above (and `["abc"]` prints the usage message instead).
