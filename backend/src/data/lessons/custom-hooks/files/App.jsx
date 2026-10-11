// Lesson 49: custom hooks.
import { useState } from "react";
// 2. import useLocalStorage from "./hooks/useLocalStorage.js";
// 4. import useFetch from "./hooks/useFetch.js";

export default function App() {
  // 2. name with useLocalStorage
  // 4. url state + useFetch(url)

  return (
    <main className="page">
      <section className="panel">
        <label htmlFor="name">Your name</label>
        <input id="name" type="text" />
        <p id="greeting">Hello, stranger!</p>
      </section>

      <section className="panel">
        <div className="row">
          <button type="button">Load users</button>
          <button type="button">Load from a broken URL</button>
        </div>
        <p id="result">Loading…</p>
      </section>
    </main>
  );
}
