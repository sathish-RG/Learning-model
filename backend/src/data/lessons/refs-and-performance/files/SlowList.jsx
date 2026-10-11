// A deliberately slow list (locked). It logs every time it renders.
import { memo } from "react";

function SlowList({ items, onSelect }) {
  console.log("SlowList rendered");
  const start = performance.now();
  while (performance.now() - start < 30) {
    // Pretend each render does a lot of work
  }
  return (
    <ul className="list">
      {items.slice(0, 50).map((item) => (
        <li key={item}>
          <button type="button" onClick={() => onSelect(item)}>
            {item}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default memo(SlowList);
