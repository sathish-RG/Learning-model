## Why does this matter?

As apps grow, two problems appear. Data that **many components** need (the theme, the logged-in user) has to be passed down through layer after layer. And state with **many possible changes** (a shopping cart: add, remove, change quantity, clear) gets messy when it's spread across lots of `setState` calls. Context and `useReducer` solve these two problems.

## Prop drilling: passing a note through the classroom 📝

Imagine passing a note from the front of a classroom to a student at the back: everyone in between has to hand it on, even though it's not for them. In React, passing a prop through components that don't use it, just to reach a deep child, is called **prop drilling**.

## Context: the school's Wi-Fi 📶

**Context** is like Wi-Fi: the router broadcasts once, and any device in range connects directly, without passing a cable through every room.

```jsx
// 1. Create the channel (usually in its own file)
export const ThemeContext = createContext("light");

// 2. Broadcast a value near the top of the tree
<ThemeContext.Provider value={{ theme, toggleTheme }}>
  <Header />
</ThemeContext.Provider>

// 3. Connect from ANY component below, however deep
const { theme, toggleTheme } = useContext(ThemeContext);
```

When the Provider's `value` changes, every component reading it re-renders automatically.

Context is great for **app-wide** things: the theme, the language, the logged-in user. For data only one or two components need, plain props are still clearer.

## useReducer: a bank teller with a rulebook 🏦

At a bank, you don't walk into the vault and change your balance yourself. You hand the teller a **request slip** ("deposit 500"), and the teller follows the **rulebook** to update the records.

```jsx
function cartReducer(cart, action) {        // the rulebook
  switch (action.type) {
    case "add":
      return [...cart, action.product];
    case "clear":
      return [];
    default:
      return cart;
  }
}

const [cart, dispatch] = useReducer(cartReducer, []);   // [] is the starting state
dispatch({ type: "add", product: apple });            // hand over a request slip
```

- The **reducer** takes the current state and an **action** (an object with a `type`), and returns the **new** state.
- It must be **pure**: no side effects, and never modify the old state. Return a new copy, just like with `useState`.
- `dispatch(action)` sends the slip; React runs the reducer and re-renders.

**Why bother?** All the ways the state can change live together in one place, with clear names. That makes them easy to read, test and debug.

## Remember ✅

- Prop drilling = passing props through components that don't need them.
- Context: `createContext` → `<Provider value={...}>` → `useContext` anywhere below.
- `useReducer(reducer, initialState)` gives `[state, dispatch]`; actions are objects with a `type`.
- Reducers are pure: they return new state, and never change the old one.
