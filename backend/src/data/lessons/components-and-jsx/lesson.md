## Why does this matter?

In Checkpoint B you wrote a `render()` function that rebuilt the page every time your data changed. That's exactly the idea behind **React**, the most popular way to build user interfaces today. React does the rebuilding for you, efficiently, and lets you build pages from small, reusable pieces.

## Components: LEGO bricks 🧱

A React app is built from **components**: small, self-contained pieces you snap together, like LEGO bricks. A header is a component, a button is a component, and the whole page is a component made of other components.

A component is just a **function that returns what to show**:

```jsx
function Header() {
  return <h1>Task Manager Pro</h1>;
}
```

Use it like an HTML tag: `<Header />`.

**Component names must start with a capital letter.** That's how React tells your `<Header />` apart from the built-in `<header>`.

## JSX: HTML inside JavaScript ✍️

The HTML-looking code is called **JSX**. It looks like HTML, but it's really JavaScript, so a few rules differ:

| HTML | JSX | Why |
|---|---|---|
| `class="card"` | `className="card"` | `class` is a reserved word in JavaScript |
| `for="email"` | `htmlFor="email"` | `for` is reserved too |
| `<img src="a.png">` | `<img src="a.png" />` | every tag must be closed |
| `onclick="..."` | `onClick={...}` | event names are camelCase |

**Curly braces `{ }` drop JavaScript into JSX:**

```jsx
const name = "Asha";
return <p>Hello, {name}! Today is {new Date().toDateString()}.</p>;
```

**One parent rule:** a component must return **one** outer element. If you don't want an extra `div`, use an empty **fragment** `<> ... </>`:

```jsx
return (
  <>
    <Header />
    <Footer />
  </>
);
```

## One component per file 📁

Each component usually lives in its own file and is **exported**, so others can **import** it, just like the modules from Phase 5:

```jsx
// Header.jsx
export default function Header() {
  return <header className="site-header">...</header>;
}

// App.jsx
import Header from "./Header.jsx";

export default function App() {
  return <Header />;
}
```

`App` is the **root** of the tree: it contains everything else, and React renders it into the page.

## Thinking in components 🧩

Look at any page and draw boxes around its parts: the header, the list, each card, the footer. Each box is a candidate component. A good component does **one** job and has a clear name.

## Remember ✅

- A component is a function, named with a capital letter, that returns JSX.
- JSX differences: `className`, `htmlFor`, closed tags, camelCase events, `{ }` for JavaScript.
- Return one parent element, or a fragment `<> </>`.
- Put each component in its own file: `export default`, then `import` it where needed.
