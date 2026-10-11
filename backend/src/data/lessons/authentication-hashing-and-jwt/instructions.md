## Your mission: accounts with hashed passwords and wristbands

Build it in `server.js`. `bcryptjs` is installed. `jwt.js` (locked) works like the `jsonwebtoken` package: open it to see how a JWT is made. Use `async` route handlers wherever you `await` bcrypt.

1. **Register.** `POST /api/register` with `{ email, password }`:
   - `email` must be a string containing `@`, and `password` a string of at least 8 characters, otherwise `400` with `{ "error": "A valid email and a password of at least 8 characters are required" }`
   - an account with that email already exists → `409` with `{ "error": "That email is already registered" }`
   - otherwise hash the password with `bcrypt.hash(password, 10)`, save `{ id, email, passwordHash }` in `users`, and answer `201` with `{ id, email }`. **Never send the hash back!**
2. **Log in.** `POST /api/login` with `{ email, password }`:
   - find the user and check the password with `bcrypt.compare`
   - no such user, or the wrong password → `401` with `{ "error": "Wrong email or password" }` (the same message for both!)
   - otherwise answer `200` with `{ token }`, made with `jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" })`
3. **The guard.** Write a `requireAuth(req, res, next)` middleware:
   - read the `Authorization` header with `req.get`; if it doesn't start with `Bearer `, answer `401` with a `WWW-Authenticate: Bearer` header and `{ "error": "Missing token" }`
   - otherwise verify the token after `Bearer ` with `jwt.verify`, save the payload as `req.user` and call `next()`
   - if `jwt.verify` throws, answer `401` with the `WWW-Authenticate: Bearer` header and `{ "error": "Invalid or expired token" }`
4. **A protected route.** `GET /api/me`, guarded by `requireAuth`, answers `200` with the logged-in user's `{ id, email }` (find them with `req.user.sub`).

Then visit `/api/me` in the preview: the browser has no token, so it gets the 401 too.

✅ **You're done when** the test drive's replies are, in order:

```
201, 409, 400, 401, 200 (with a token), 401, 401, 401, 200
```

with `WWW-Authenticate: Bearer` on the three `/api/me` 401s (missing, fake and **forged** tokens), `{"id":1,"email":"asha@example.com"}` on the final `200`, and the token's readable payload printed at the end.
