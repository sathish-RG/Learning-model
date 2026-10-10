## Why does this matter?

In the JavaScript modules, you updated the page by hand with `innerHTML`. That works for small things, but in a big app it's easy to forget to update one part, and then the screen shows the wrong thing.

**React fixes this.** You describe what the screen should look like for your data, and React keeps the page in sync for you. It's like a spreadsheet: change one cell, and every total that depends on it updates automatically.

## Components: LEGO bricks 🧱

A React app is built from **components**: small, reusable pieces you snap together. A component is just a function that returns what to show:

```jsx
function TaskItem() {
  return <li>Buy milk</li>;
}
```

That HTML-looking code inside JavaScript is called **JSX**. Use curly braces `{ }` to drop JavaScript values into it.

## Props: settings for a component ⚙️

Props are the inputs you pass to a component, like choosing the size and flavor when ordering a coffee. The same component can show different things:

```jsx
function TaskItem({ title }) {
  return <li>{title}</li>;
}

<TaskItem title="Buy milk" />
<TaskItem title="Walk the dog" />
```

## useState: a component's memory 🧠

Normal variables are forgotten every time a component redraws. **State** is memory that sticks around, and changing it tells React to redraw:

```jsx
const [count, setCount] = useState(0);

<button onClick={() => setCount(count + 1)}>
  Clicked {count} times
</button>
```

Think of a scoreboard: you don't repaint the board yourself. You tell the operator the new score (`setCount`), and they update it.

**Golden rule:** never change state directly. Always use the setter, and for lists create a new one: `setTasks([...tasks, newTask])`.

## useEffect: "after you've drawn the page, also do this" 📬

Some jobs aren't about drawing, like loading data from a server. `useEffect` runs them **after** React has shown the page:

```jsx
useEffect(() => {
  loadTasks();
}, []); // [] means: only once, when the component first appears
```

## React Router: pages without reloading 🗂️

React Router lets one app have many "pages" (like `/dashboard` and `/settings`) and switch between them instantly, like flipping tabs in a binder instead of fetching a new book.

## Remember ✅

- **Components** are LEGO bricks, and **props** are their settings.
- **State** is memory: change it with the setter and React redraws.
- **useEffect** runs side jobs (like loading data) after drawing.
- **React Router** switches pages without a full reload.
