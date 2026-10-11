// Lesson 60: register, log in, and get a festival wristband (a JWT) to enter protected routes.
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("./jwt"); // in a real project: require("jsonwebtoken"), with the same functions
const testDrive = require("./requests");

const app = express();
app.use(express.json());

// In a real app this comes from process.env.JWT_SECRET: a long random value, never in your code
const JWT_SECRET = "dev-only-secret-change-me";

const users = []; // { id, email, passwordHash }. In Phase 8 this becomes a database
let nextUserId = 1;

app.get("/", (req, res) => {
  res.send("<h1>Auth API</h1><p>Visit <a href=\"/api/me\">/api/me</a>: a browser has no token, so it should get a 401.</p>");
});

// 1. POST /api/register  → 201 { id, email } (never the hash!), or 400 / 409

// 2. POST /api/login  → 200 { token }, or 401

// 3. requireAuth(req, res, next): checks "Authorization: Bearer <token>"

// 4. GET /api/me  → protected by requireAuth: 200 { id, email }

app.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
  testDrive(); // locked (requests.js): calls your API and prints each reply
});
