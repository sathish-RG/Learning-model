// Lesson 46: useEffect and the component lifecycle.
import { useEffect, useState } from "react";
import Timer from "./Timer.jsx";
import { fetchUsers } from "./api.js";

export default function App() {
  const [showTimer, setShowTimer] = useState(true);
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState(null);

  // 3. An effect that depends on count

  // 4. Load users once, on mount

  return (
    <main className="page">
      <section className="panel">
        <button type="button" onClick={() => setShowTimer((show) => !show)}>
          Show / hide timer
        </button>
        {showTimer && <Timer />}
      </section>

      <section className="panel">
        <button type="button" onClick={() => setCount((c) => c + 1)}>
          Clicked {count} times
        </button>
      </section>

      <section className="panel">
        <h2>Team</h2>
        <p id="users">Loading users…</p>
      </section>
    </main>
  );
}
