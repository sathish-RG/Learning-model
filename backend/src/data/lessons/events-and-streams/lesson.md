## Why does this matter?

A server is mostly **waiting**: for the next visitor, the next chunk of an upload, the disk, the database. Node handles all of this with two ideas you'll find everywhere in it: **events** ("tell me when something happens") and **streams** ("give me the data bit by bit, as it arrives"). They are why one small Node server can serve thousands of people at once.

## Events: "call me when it happens" 🔔

You already know events from the browser: `button.addEventListener("click", ...)`. Node has the same idea for everything, through **`EventEmitter`**:

```js
const EventEmitter = require("events");

const kitchen = new EventEmitter();

kitchen.on("order", (dish) => console.log(`Cooking ${dish}...`)); // listen
kitchen.once("closed", () => console.log("Kitchen closed"));    // listen ONE time only

kitchen.emit("order", "Masala dosa"); // Cooking Masala dosa...
kitchen.emit("order", "Idli");        // Cooking Idli...
kitchen.emit("closed");               // Kitchen closed
kitchen.emit("closed");               // (nothing: once listeners remove themselves)
```

| Method | Meaning |
|---|---|
| `.on(name, fn)` | Run `fn` every time `name` happens |
| `.once(name, fn)` | Run `fn` the first time only |
| `.emit(name, ...data)` | Announce that `name` happened, passing data to every listener |

Much of Node is built on this: a server **emits** `"request"` for every visitor, and a stream **emits** `"data"` for every chunk.

## Streams: a hose, not a bucket 🚿

Say you need to search a 2 GB log file. `readFile` is like filling a **bucket**: you wait for all 2 GB, and they all sit in memory at once. Too many visitors doing that, and the server runs out of memory.

A **stream** is a **hose**: the data flows through in small **chunks** (often 64 KB each), you deal with each chunk as it arrives, and then it's gone. Memory use stays tiny, however big the file is.

| Stream type | What it is | Example |
|---|---|---|
| **Readable** | Data comes **out** of it | `fs.createReadStream("big.log")`, an incoming request |
| **Writable** | Data goes **into** it | `fs.createWriteStream("out.log")`, a response |
| **Transform** | Data goes in, **changed** data comes out | compress, encrypt, filter |

## Connecting the hoses: pipeline 🔗

`pipeline` joins streams like pipes: the data flows from one to the next, and it calls you back once at the end, with an error if any stage failed:

```js
const fs = require("fs");
const { pipeline } = require("stream");

pipeline(
  fs.createReadStream("big.log"),     // source
  fs.createWriteStream("copy.log"),   // destination
  (error) => console.log(error ? `Failed: ${error.message}` : "Copied!"),
);
```

It also handles **backpressure** for you: if the destination is slow, the source waits instead of piling data up in memory. (You may also see the older `source.pipe(destination)`. It works, but it doesn't report errors well.)

## Writing your own Transform and Writable ✍️

```js
const { Transform, Writable } = require("stream");

const shout = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase()); // (no error, the changed data)
  },
});

const printer = new Writable({
  write(chunk, encoding, callback) {
    console.log(`Got: ${chunk}`);
    callback(); // "done with this chunk: send the next one"
  },
});
```

Always call `callback()`, or the stream waits forever for you. In a Transform you can also call `this.push(data)` as many times as you like (even zero), then `callback()`.

## The tricky part: chunks don't care about lines ✂️

A chunk is just "the next 1,024 characters", so it can end in the **middle** of a line:

```
chunk 1: "...INFO GET /api/menu 200\n2026-10-11T09:00:28.000Z INF"
chunk 2: "O GET /api/menu 200\n..."
```

The fix: split each chunk into lines, but **keep the last, unfinished piece** and glue it to the front of the next chunk:

```js
let leftover = "";

const lines = new Transform({
  transform(chunk, encoding, callback) {
    const parts = (leftover + chunk.toString()).split("\n");
    leftover = parts.pop();          // the last piece may be unfinished: save it for later
    for (const line of parts) {
      this.push(line + "\n");        // every other piece is a complete line
    }
    callback();
  },
  flush(callback) {                  // runs once, after the last chunk
    if (leftover) this.push(leftover + "\n");
    callback();
  },
});
```

## Remember ✅

- `EventEmitter`: `.on` listens, `.once` listens once, `.emit` announces (with data).
- Streams process data **in chunks**, so huge files never fill your memory.
- Readable → Transform → Writable, connected with `pipeline(..., (error) => {})`.
- In your own streams, always call `callback()`; use `this.push()` to pass data along.
- Chunks can cut lines in half: keep the `leftover`, and handle it in `flush`.
