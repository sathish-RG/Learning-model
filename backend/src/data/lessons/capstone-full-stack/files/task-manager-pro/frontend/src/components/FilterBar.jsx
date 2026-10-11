// The All / Active / Done buttons. Shows the current filter; calls onChange(newFilter).
const FILTERS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "done", label: "Done" },
];

export default function FilterBar({ filter, onChange }) {
  return (
    <div className="filters" role="group" aria-label="Show">
      {FILTERS.map(({ value, label }) => (
        <button key={value} className="filter" type="button" aria-pressed={filter === value} onClick={() => onChange(value)}>
          {label}
        </button>
      ))}
    </div>
  );
}
