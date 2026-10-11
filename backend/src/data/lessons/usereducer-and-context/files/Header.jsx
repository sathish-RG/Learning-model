// Locked: notice that Header passes NO props to Toolbar.
import Toolbar from "./Toolbar.jsx";

export default function Header() {
  return (
    <header className="header">
      <h1>Context Shop</h1>
      <Toolbar />
    </header>
  );
}
