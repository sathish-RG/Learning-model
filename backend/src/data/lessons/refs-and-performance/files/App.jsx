// Lesson 47: refs and performance.
import { useCallback, useMemo, useRef, useState } from "react";
import SlowList from "./SlowList.jsx";

const allItems = Array.from({ length: 200 }, (_, i) => `Item ${i + 1}`);

export default function App() {
  const [query, setQuery] = useState("");
  const [likes, setLikes] = useState(0);
  const [selected, setSelected] = useState(null);

  // 1. inputRef
  // 2. renders ref (count every render)

  // 4. Wrap this in useMemo
  const visible = allItems.filter((item) => item.toLowerCase().includes(query.toLowerCase()));

  // 5. Wrap this in useCallback
  const handleSelect = (item) => setSelected(item);

  return (
    <main className="page">
      <div className="row">
        <input type="search" placeholder="Search items…" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button type="button">Focus search</button>
      </div>
      <div className="row">
        <button type="button" onClick={() => setLikes((n) => n + 1)}>👍 Like ({likes})</button>
        <span>Selected: {selected ?? "nothing"}</span>
        <span>
          Renders: <b id="renders">0</b>
        </span>
      </div>
      <SlowList items={visible} onSelect={handleSelect} />
    </main>
  );
}
