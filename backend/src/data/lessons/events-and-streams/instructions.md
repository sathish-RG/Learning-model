## Your mission: find the errors in a huge log

`log-source.js` (locked) gives you `createLogStream()`: a Readable stream of a 5,000-line server log, arriving **1 KB at a time**, just like a big file read with `fs.createReadStream`. Every 20th line is an `ERROR`. Write everything in `app.js`.

1. **A monitor.** Create an `EventEmitter` called `monitor`.
   - With `.on`, listen for `"progress"` and print `Checked N lines`.
   - With `.once`, listen for `"done"` and print `Done: N lines in N chunks, N errors` (it receives an object with those three numbers).
2. **A filter.** Create a `Transform` called `errorsOnly`. For every chunk:
   - add 1 to a `chunks` counter
   - split it into complete lines, keeping the `leftover` (exactly as in the lesson)
   - add 1 to a `lines` counter for every complete line, and every time `lines` reaches a multiple of 1000, emit `"progress"` with it
   - `this.push` only the lines that contain `ERROR` (with their `"\n"`)
   - in `flush`, handle any leftover the same way
3. **A collector.** Create a `Writable` called `collector`. For every chunk it receives, it splits the text into lines (skipping empty ones), adds how many there are to an `errors` counter, and keeps the very first error line in a `firstError` variable. Don't forget `callback()`!
4. **Connect them.** Call `pipeline(createLogStream(), errorsOnly, collector, callback)`. In the callback, if there's an error, print it with `console.error`. Otherwise emit `"done"` with `{ lines, chunks, errors }`, and print `First error: ` followed by `firstError`.

✅ **You're done when** the console shows `Checked 1000 lines` up to `Checked 5000 lines`, then `Done: 5000 lines in 240 chunks, 250 errors`, then:

```
First error: 2026-10-11T09:00:20.000Z ERROR POST /api/orders 500 Payment failed
```
