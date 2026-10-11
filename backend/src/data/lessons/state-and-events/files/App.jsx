// Lesson 43: state and events.
import { useState } from "react";

export default function App() {
  // 1-5. Create your state here

  return (
    <main className="page">
      <section className="panel">
        <h2>Counter</h2>
        <p id="count">0</p>
        <div className="row">
          <button type="button">−1</button>
          <button type="button">+1</button>
          <button type="button">+3</button>
          <button type="button">Reset</button>
        </div>
      </section>

      <section className="panel">
        <h2>Switch</h2>
        <button type="button" className="switch">OFF</button>
      </section>

      <section className="panel">
        <h2>Items</h2>
        <p><span id="item-count">1</span> items: <span id="items">Learn props</span></p>
        <button type="button">Add item</button>
      </section>

      <section className="panel">
        <h2>Profile</h2>
        <p id="profile">Asha · level 1</p>
        <button type="button">Level up</button>
      </section>
    </main>
  );
}
