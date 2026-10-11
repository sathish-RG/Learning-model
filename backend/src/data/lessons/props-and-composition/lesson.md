## Why does this matter?

A `Button` that can only ever say "Click me" isn't much use. Real components are **configurable**: the same `Button` can be a big green "Sign up" or a small grey "Cancel". **Props** make one component reusable in many places, and they're how parts of your app talk to each other.

## Props: settings on an order ☕

Ordering a coffee, you choose the settings: size, milk, sugar. The coffee machine is the same; the settings change the result.

**Props** are a component's settings. You pass them like HTML attributes:

```jsx
<Greeting name="Asha" emoji="👋" />
```

And the component receives them as **one object**, usually unpacked right away with destructuring:

```jsx
function Greeting({ name, emoji }) {
  return <p>{emoji} Hello, {name}!</p>;
}
```

- **Text** goes in quotes: `name="Asha"`.
- **Anything else** goes in curly braces: `count={3}`, `isActive={true}`, `items={["a", "b"]}`.

## Default values

Give a prop a fallback for when it isn't passed:

```jsx
function Button({ variant = "primary", children }) { ... }
```

## children: a gift box 🎁

Whatever you put **between** a component's opening and closing tags arrives as a special prop called `children`. The component is like a gift box: it provides the wrapping, and you choose what goes inside.

```jsx
function Card({ title, children }) {
  return (
    <article className="card">
      <h2>{title}</h2>
      <div className="card-body">{children}</div>
    </article>
  );
}

<Card title="Pro plan">
  <p>Everything you need.</p>
  <Button>Choose</Button>
</Card>
```

Building bigger components from smaller ones like this is called **composition**, and it's React's superpower.

## Passing functions: "call me when it happens" 📞

Props can be **functions**. A parent passes a function down, and the child calls it when something happens:

```jsx
function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

<Button onClick={() => console.log("Chose Pro")}>Choose</Button>
```

Note that `onClick={handler}` passes the function itself. Writing `onClick={handler()}` would call it immediately while rendering, which is a common mistake!

## Data flows down ⬇️

Props travel **one way: from parent to child**, like a letter sent down the family tree. A child must **never change** its props; they're read-only. If a child needs to tell the parent something, it calls a function the parent passed down.

## Remember ✅

- Props are a component's settings, passed like attributes: text in quotes, everything else in `{ }`.
- Destructure them in the parameters, with defaults if you like: `({ variant = "primary" })`.
- `children` is whatever goes between the tags: use it to build wrapper components.
- Props flow down and are read-only; pass functions down so children can report back.
