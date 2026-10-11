// Lesson 48: useReducer and Context.
import { useReducer, useState } from "react";
import Header from "./Header.jsx";
// 2. import ThemeContext
// 5. import cartReducer

const products = [
  { id: 1, name: "Notebook", price: 50 },
  { id: 2, name: "Pen", price: 10 },
  { id: 3, name: "Backpack", price: 900 },
];

export default function App() {
  // 2. theme state + toggleTheme
  // 5. const [cart, dispatch] = useReducer(...)

  return (
    <main className="page">
      <Header />
      <section className="panel">
        <h2>Shop</h2>
        {products.map((product) => (
          <div key={product.id} className="row">
            <span>
              {product.name} · ₹{product.price}
            </span>
            <button type="button">Add</button>
          </div>
        ))}
      </section>
      <section className="panel">
        <h2>Cart</h2>
        <ul id="cart">{/* 5. cart items */}</ul>
        <p id="total">Total: ₹0</p>
        <button type="button">Clear cart</button>
      </section>
    </main>
  );
}
