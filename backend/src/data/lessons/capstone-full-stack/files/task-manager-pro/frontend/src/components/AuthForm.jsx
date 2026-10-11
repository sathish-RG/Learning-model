// One form for both "Log in" and "Create account".
import { useState } from "react";
import { api } from "../api.js";

export default function AuthForm({ onLoggedIn }) {
  const [mode, setMode] = useState("login"); // or "register"
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const registering = mode === "register";

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const body = registering ? form : { email: form.email, password: form.password };
      const data = await api(`/auth/${mode}`, { method: "POST", body });
      onLoggedIn(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="auth">
      <form className="card auth-card" onSubmit={handleSubmit}>
        <h1>Task Manager Pro</h1>
        <p className="muted">{registering ? "Create your account" : "Log in to see your tasks"}</p>

        {registering && (
          <>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" autoComplete="name" value={form.name} onChange={update} required />
          </>
        )}
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" value={form.email} onChange={update} required />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete={registering ? "new-password" : "current-password"}
          minLength={registering ? 8 : undefined}
          value={form.password}
          onChange={update}
          required
        />

        <p className="form-error" aria-live="polite">{error}</p>
        <button className="button" type="submit" disabled={busy}>
          {busy ? "Please wait…" : registering ? "Create account" : "Log in"}
        </button>
        <button className="link-button" type="button" onClick={() => setMode(registering ? "login" : "register")}>
          {registering ? "Already have an account? Log in" : "New here? Create an account"}
        </button>
      </form>
    </main>
  );
}
