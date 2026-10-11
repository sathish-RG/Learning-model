## Why does this matter?

A browser can't touch your files, for good reason. A server **must**: it reads settings, saves uploads, writes logs and stores data. Node's built-in **`fs`** (file system) module does all of that. It's also your first taste of the kitchen's **pantry**: a place where data stays put, even after the program stops.

## Reading and writing, the modern way 📂

Use the **promise** version, `fs/promises`, with `async` / `await` (from Phase 5):

```js
const fs = require("fs/promises");

async function main() {
  const text = await fs.readFile("notes.txt", "utf8"); // "utf8": give me text, not raw bytes
  console.log(text);

  await fs.writeFile("copy.txt", text);                // creates the file, or replaces it
}

main();
```

| Function | What it does |
|---|---|
| `fs.readFile(file, "utf8")` | Reads the whole file as text |
| `fs.writeFile(file, text)` | Creates the file, or **overwrites** it completely |
| `fs.appendFile(file, text)` | Adds text to the end |
| `fs.mkdir(folder, { recursive: true })` | Creates a folder (and its parents). No error if it already exists. |
| `fs.readdir(folder)` | Lists the files in a folder |

> 💡 You'll also see `fs.readFileSync(...)`. The **Sync** versions stop the whole program until the disk answers. That's fine in a tiny script, but in a server it means **every** visitor waits. Prefer the promise versions.

## Paths: say exactly where 🧭

`"notes.txt"` is found relative to the folder you **started** Node from, which may not be where your file lives. To be safe, build paths from **`__dirname`**: the folder that contains the current file.

```js
const path = require("path");

const file = path.join(__dirname, "data", "tasks.json");
// /home/you/project/data/tasks.json  (with the right slashes on every system)
```

| Helper | Example | Result |
|---|---|---|
| `path.join(...)` | `path.join("data", "a.json")` | `data/a.json` |
| `path.basename(p)` | `path.basename("/x/a.json")` | `a.json` |
| `path.extname(p)` | `path.extname("a.json")` | `.json` |
| `path.dirname(p)` | `path.dirname("/x/a.json")` | `/x` |

Never glue paths together with `+ "/" +`: Windows uses `\`, and `path.join` handles that for you.

## JSON files: your first tiny database 🗃️

A file only holds **text**. To store an array of objects, turn it into JSON text when you save, and back into objects when you load (just like `localStorage` in Phase 4):

```js
const tasks = JSON.parse(await fs.readFile(file, "utf8"));     // text → array
tasks.push({ id: 4, title: "New", done: false });
await fs.writeFile(file, JSON.stringify(tasks, null, 2));        // array → text
```

The `null, 2` makes the saved file **pretty**, with 2-space indents, so people can read it.

## When the file isn't there ❓

Reading a file that doesn't exist throws an error whose `code` is **`"ENOENT"`** ("Error: NO ENTry"). Often that's not a real problem: there's simply no data yet. Catch that one case, and let any other error through:

```js
async function loadTasks(file) {
  try {
    return JSON.parse(await fs.readFile(file, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return []; // no file yet: start with an empty list
    throw error;                            // anything else is a real bug: don't hide it
  }
}
```

## Remember ✅

- Use `require("fs/promises")` with `await`: `readFile(file, "utf8")`, `writeFile`, `mkdir(..., { recursive: true })`.
- Build paths with `path.join(__dirname, ...)`, never with `+ "/"`.
- Files hold text: `JSON.parse` when loading, `JSON.stringify(data, null, 2)` when saving.
- `error.code === "ENOENT"` means "no such file". Handle it; rethrow everything else.
- Avoid the `Sync` versions in servers: they make everyone wait.
