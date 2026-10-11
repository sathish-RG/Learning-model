// Register, log in, log out, and "who am I?". The login token lives in an httpOnly cookie,
// so JavaScript in the browser (including an attacker's script) can never read it.
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function sendSession(res, status, user) {
  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.cookie("token", token, {
    httpOnly: true, // invisible to JavaScript
    sameSite: "lax", // not sent with requests started by other websites
    secure: process.env.NODE_ENV === "production", // HTTPS only, once deployed
    maxAge: WEEK_MS,
  });
  res.status(status).json({ user });
}

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (typeof password !== "string" || password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters" });
  }
  if (typeof email === "string" && (await User.exists({ email: email.toLowerCase().trim() }))) {
    return res.status(409).json({ error: "That email is already registered" });
  }
  // Mongoose validates the name and email. (Two sign-ups at the same instant could both pass the
  // check above: the unique index on email stops the second, and the error handler sends 409.)
  const user = await User.create({ name, email, passwordHash: await bcrypt.hash(password, 10) });
  sendSession(res, 201, user);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: String(email).toLowerCase().trim() }).select("+passwordHash");
  // The same answer for a wrong email and a wrong password
  if (!user || !(await bcrypt.compare(String(password), user.passwordHash))) {
    return res.status(401).json({ error: "Wrong email or password" });
  }
  sendSession(res, 200, user);
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(204).end();
});

router.get("/me", requireAuth, async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(401).json({ error: "Please log in" });
  res.json({ user });
});

module.exports = router;
