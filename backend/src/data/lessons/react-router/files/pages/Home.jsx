// The home page (already written for you).
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <h1>Welcome to Task Router</h1>
      <p>
        Browse your <Link to="/tasks">tasks</Link>, or open one to see its details.
      </p>
    </>
  );
}
