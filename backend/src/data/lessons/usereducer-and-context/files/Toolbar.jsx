// Lesson 48: read the theme from context (no props!).
export default function Toolbar() {
  return (
    <div className="toolbar">
      <span id="theme-label">Theme: ?</span>
      <button type="button">Toggle theme</button>
    </div>
  );
}
