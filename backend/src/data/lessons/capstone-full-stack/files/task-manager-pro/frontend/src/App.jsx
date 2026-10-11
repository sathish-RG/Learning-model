// Checks for a session once (the cookie), then shows the login form or the task board.
import { useEffect, useState } from "react";
import { api } from "./api.js";
import AuthForm from "./components/AuthForm.jsx";
import TaskBoard from "./components/TaskBoard.jsx";

export default function App() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    api("/auth/me")
      .then((data) => setUser(data.user))
      .catch(() => setUser(null)) // 401: not logged in yet
      .finally(() => setChecking(false));
  }, []);

  const logout = async () => {
    await api("/auth/logout", { method: "POST" });
    setUser(null);
  };

  if (checking) return <p className="loading">Loading…</p>;
  if (!user) return <AuthForm onLoggedIn={setUser} />;
  return <TaskBoard user={user} onLogout={logout} />;
}
