// Lesson 45: controlled forms.
import { useState } from "react";

export default function App() {
  // 1. form state (and a `submitted` state for step 4)

  return (
    <main className="page">
      <form className="card">
        <h1>Join the course</h1>

        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" />
        <p className="error"></p>

        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" />
        <p className="error"></p>

        <label htmlFor="plan">Plan</label>
        <select id="plan" name="plan">
          <option value="free">Free</option>
          <option value="pro">Pro</option>
        </select>

        <div className="terms">
          <input id="agree" name="agree" type="checkbox" />
          <label htmlFor="agree">I accept the terms</label>
        </div>
        <p className="error"></p>

        <p id="preview">Someone is joining the free plan</p>
        <button type="submit">Sign up</button>
        <p id="result"></p>
      </form>
    </main>
  );
}
