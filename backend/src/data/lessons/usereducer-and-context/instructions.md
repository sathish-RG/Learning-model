## Your mission: a theme broadcast and a shopping cart

Files: `App.jsx`, `ThemeContext.jsx`, `Toolbar.jsx` and `cartReducer.js`. `Header.jsx` is locked: it renders `<Toolbar />` without passing any props.

1. **Create the context.** In `ThemeContext.jsx`, export `ThemeContext = createContext(null)`.
2. **Broadcast it.** In `App.jsx`, create `theme` state (`"light"`) and a `toggleTheme` function that switches between `"light"` and `"dark"`. Wrap the page in `<ThemeContext.Provider value={{ theme, toggleTheme }}>`, and give `<main>` the class `page` plus the theme (e.g. `page dark`).
3. **Connect deep down.** In `Toolbar.jsx`, read `theme` and `toggleTheme` with `useContext`. Show `Theme: dark` (the current theme) and a button that toggles it. No props needed!
4. **The rulebook.** In `cartReducer.js`, export a reducer for the cart (an array of `{ id, name, price, qty }`) that handles:
   - `"add"`: if the product is already in the cart, add 1 to its `qty`; otherwise add it with `qty: 1`
   - `"remove"`: remove the item with `action.id`
   - `"clear"`: empty the cart
5. **Use it.** In `App.jsx`, use `useReducer(cartReducer, [])`:
   - each product's `Add` button dispatches `add`
   - show each cart item as `NAME × QTY` with a `Remove` button
   - show the total price in `#total` as `Total: ₹N`
   - `Clear cart` dispatches `clear`

✅ **You're done when** the toolbar button switches the whole page to dark without any props being passed down; adding a product twice shows `× 2`; Remove and Clear work; and the total is always right.
