## Why does this matter?

So far, all your JavaScript has run **in the browser**, on the visitor's computer. But every real app also needs code that runs somewhere else: code that stores everyone's tasks, checks passwords and sends emails. **Node.js** lets you write that code in the **same JavaScript you already know**. One language for the whole app is what "full-stack JavaScript" means.

## A restaurant: dining room, kitchen and waiter 🍽️

Think of a web app as a restaurant:

| Restaurant | Web app | What it does |
|---|---|---|
| 🪑 **Dining room** | **Frontend** (HTML, CSS, React) | What guests see and touch. Nice to look at, but no cooking happens here. |
| 🍳 **Kitchen** | **Backend** (Node.js) | Where the real work happens: the food (data) is stored and prepared. Guests never walk in. |
| 🧑‍🍳 **Waiter** | **API** | Carries orders (**requests**) from the dining room to the kitchen, and brings back the food (**responses**). |

Guests never walk into the kitchen and grab ingredients: they ask the waiter. In the same way, the browser never reads your database directly: it asks your **API**. In this phase you build the kitchen.

## What is Node.js? ⚙️

Node.js takes the JavaScript engine from Chrome (called **V8**) out of the browser, and adds what a server needs: reading files, talking over the network, and more. You run a file by typing one command in a terminal:

```bash
node app.js
```

The language is the same, but the surroundings are different:

| In the browser 🌐 | In Node 🖥️ |
|---|---|
| `window`, `document`, `alert()` | ❌ They don't exist: there's no page! |
| `console.log` prints in the devtools | `console.log` prints in the **terminal** |
| Can't read your files (for safety) | `fs` reads and writes files |
| — | `process` tells you about the running program |

## Modules: one file, one job 📦

In Node, every file is its own **module**. Nothing inside it is visible to other files unless you **export** it:

```js
// greet.js
function greet(name) {
  return `Hello, ${name}!`;
}
const secret = "only for this file"; // not exported, so it stays private

module.exports = { greet };
```

Another file then **imports** it with `require`:

```js
// app.js
const { greet } = require("./greet"); // "./" means "my own file, next to this one"
console.log(greet("Asha"));           // Hello, Asha!
```

There are three kinds of modules, and `require` loads them all:

| Kind | Example | Where it comes from |
|---|---|---|
| **Built-in** | `require("os")`, `require("fs")` | Comes with Node. No install needed. |
| **Your own** | `require("./greet")` | A file in your project (starts with `./` or `../`). |
| **npm packages** | `require("express")` | Installed with `npm install express`. |

**npm** is Node's app store for code. `npm install express` downloads a package into a `node_modules` folder and records it in `package.json`, your project's ID card. (Never commit `node_modules`: anyone can recreate it with `npm install`.)

> 💡 You may also see `import` / `export` in Node code, the ES modules from Phase 5. They work in Node too (with `"type": "module"` in package.json). This phase uses `require`, because you'll meet it in tons of existing code, and the ideas are exactly the same.

## Talking to your program: process.argv 🗣️

Command-line tools read what you type after the file name. Node puts it in the `process.argv` array:

```bash
node app.js 1200 15
```

```js
console.log(process.argv);
// [ "/usr/bin/node", "/home/you/app.js", "1200", "15" ]

const [bill, percent] = process.argv.slice(2); // skip the first two: node and the file
console.log(Number(bill) + 1); // 1201. Arguments are always TEXT, so convert them!
```

When something goes wrong, a good command-line tool prints a **usage message** and finishes with an **exit code**: `0` means success, anything else means failure. Other programs (and you) can check it.

```js
console.error("Usage: node app.js <bill> <tip-percent>"); // console.error is for problems
process.exitCode = 1; // the program will finish with "failure"
```

## Remember ✅

- Frontend = dining room, backend = kitchen, API = the waiter carrying requests and responses.
- Node runs JavaScript **outside the browser**: no `window` or `document`, but `fs`, `process` and more.
- Every file is a module: share things with `module.exports`, load them with `require`.
- Built-in modules (`"os"`), your own (`"./tip"`) and npm packages (`"express"`) are all loaded with `require`.
- `process.argv.slice(2)` gives the command-line arguments, **as text**. Use `process.exitCode = 1` to report failure.
