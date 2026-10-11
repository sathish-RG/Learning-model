## Your mission: a pricing page from two reusable components

There are three files: `App.jsx`, `Button.jsx` and `Card.jsx`.

1. **Button.** In `Button.jsx`, export a `Button` component that takes `variant` (default `"primary"`), `onClick` and `children`. It renders a `<button>` with `` className={`btn btn-${variant}`} ``, the `onClick`, and the `children` as its text.
2. **Card.** In `Card.jsx`, export a `Card` that takes `title` and `children`, and renders:

   ```jsx
   <article className="card">
     <h2>{title}</h2>
     <div className="card-body">{children}</div>
   </article>
   ```

3. **Compose the page.** In `App.jsx`, inside the `.plans` div, render three Cards:
   - `Free`: a paragraph `For trying things out`, and a `secondary` Button
   - `Pro`: a paragraph `For serious learners`, and a Button (primary by default)
   - `Team`: a paragraph `For the whole class`, and a `secondary` Button

   Every Button says `Choose`.
4. **Report back.** Give each Button an `onClick` that logs `Chose Free`, `Chose Pro` or `Chose Team`.

✅ **You're done when** three cards appear side by side, only the Pro button is green, and clicking each button logs its plan in the console.
