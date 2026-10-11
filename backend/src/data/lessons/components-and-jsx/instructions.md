## Your mission: split one big component into bricks

`App.jsx` holds the whole page in one big block. Split it into three components, one per file. The page must look exactly the same afterwards.

1. **Header.** Move the `<header>…</header>` JSX into `Header.jsx` as `export default function Header()`. In `App.jsx`, import it and use `<Header />` in its place.
2. **TaskList.** Move the `<section className="task-list">…</section>` into `TaskList.jsx` the same way.
3. **Footer.** Move the `<footer>…</footer>` into `Footer.jsx`. Replace the hard-coded year with `{new Date().getFullYear()}`.
4. **Fix the JSX.** The console shows warnings, because the starter uses `class` and `for` (that's HTML, not JSX!). Change them to `className` and `htmlFor`.

`App.jsx` should end up returning just `<Header />`, `<TaskList />` and `<Footer />` inside a fragment.

✅ **You're done when** the page looks the same as before, the footer shows the current year, and the console has no warnings.
