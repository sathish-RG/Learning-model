## Why does this matter?

Almost every app has accounts: *your* tasks, *your* orders, *your* settings. That raises two questions every backend must answer safely: **"Who are you?"** (**authentication**) and **"Are you allowed to do this?"** (**authorization**). Get them wrong, and strangers read other people's data. Two tools solve the core of it: **password hashing** and **tokens**.

## Never store passwords. Store hashes. 🔒

If your database is ever stolen (it happens to big companies every year), plain passwords would be a disaster: people reuse them everywhere. So you store a **hash** instead.

A **hash function** turns text into a fingerprint, and it only works **one way**: you can turn `supersecret1` into a hash, but you can't turn the hash back into `supersecret1`.

```
supersecret1  →  $2a$10$N9qo8uLOickgx2ZMRZoMye.IjZAgcfl7p92ldGxad68LJZdL17lhW
```

At login, you don't "decrypt" anything: you hash the password that was typed in the same way, and check whether the fingerprints match.

**bcrypt** is the classic password hasher, and it adds two protections:

- a **salt**: random characters mixed in, so two people with the same password get **different** hashes;
- it's **slow on purpose** (about a tenth of a second). Nothing for one login, but a nightmare for an attacker trying billions of guesses. The `10` below is the **cost**: each +1 doubles the work.

```js
const bcrypt = require("bcryptjs"); // npm install bcryptjs

const passwordHash = await bcrypt.hash("supersecret1", 10);          // when registering
const ok = await bcrypt.compare("supersecret1", passwordHash);       // at login: true
const nope = await bcrypt.compare("wrong-password", passwordHash);   // false
```

> 🔐 Hashing ≠ encryption. Encrypted data can be decrypted with the key; a hash can't be reversed at all. For passwords, you want the one-way kind.

## The festival wristband: JWTs 🎟️

Picture a music festival. At the entrance you show your ticket and ID **once**. In return, you get a **wristband**. All weekend, the security guards at each stage just glance at your wrist: no ID check, no ticket check, no phoning the box office.

The wristband works because:

- ✅ it's **stamped by the organizer** in a way nobody can copy (a forged one is spotted at once);
- 📝 it **says things about you** printed on it: "Asha · VIP · Saturday";
- ⏰ it **expires**: Saturday's band won't get you in on Sunday;
- 👀 anyone can **read** what's printed on it, so you'd never print your bank PIN there.

A **JWT** (JSON Web Token, say "jot") is exactly that wristband:

| Festival | JWT |
|---|---|
| Showing your ticket and ID at the entrance | `POST /api/login` with email and password |
| The wristband you're given | The **token** the server sends back |
| What's printed on it | The **payload**: `{ "sub": 1, "email": "asha@example.com" }` |
| The organizer's stamp | The **signature**, made with the server's **secret** |
| The guards glancing at your wrist | The `requireAuth` middleware checking the token |
| It expires | `exp`: the token stops working after, say, 1 hour |

## What's inside a JWT 🔍

A JWT is three base64url-encoded parts, separated by dots:

```
eyJhbGciOiJIUzI1NiJ9 . eyJzdWIiOjEsImVtYWlsIjoiYXNoYUBleGFtcGxlLmNvbSJ9 . pXr0...k9Q
      header                          payload                              signature
```

1. **Header**: how it's signed (`HS256`).
2. **Payload**: the data. `sub` (the "subject": the user's id) is the usual name. It's only *encoded*, **not encrypted**: anyone can read it!
3. **Signature**: a fingerprint of the first two parts, made with your **secret**. Change one letter of the payload, and the signature no longer matches, so the server rejects it. Without the secret, nobody can make a valid one.

```js
const token = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
const payload = jwt.verify(token, JWT_SECRET); // the payload, or it THROWS (bad or expired)
```

## Showing the wristband: the Authorization header 🏷️

After logging in, the client sends the token with every request, in a header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOjF9.pXr0...k9Q
```

"Bearer" means "whoever *bears* (carries) this token". A middleware checks it before the protected route runs (the guard at the stage):

```js
function requireAuth(req, res, next) {
  const header = req.get("Authorization") || "";   // req.get reads a request header
  if (!header.startsWith("Bearer ")) {
    return res.status(401).set("WWW-Authenticate", "Bearer").json({ error: "Missing token" });
  }
  try {
    req.user = jwt.verify(header.slice(7), JWT_SECRET); // the text after "Bearer "
    next();                                             // ✅ let them in
  } catch {
    res.status(401).set("WWW-Authenticate", "Bearer").json({ error: "Invalid or expired token" });
  }
}

app.get("/api/me", requireAuth, (req, res) => { /* req.user.sub is the user's id */ });
```

## 401 or 403? 🚫

| Code | Means | Festival |
|---|---|---|
| `401 Unauthorized` | "I don't know who you are": no token, a fake one or an expired one | No wristband |
| `403 Forbidden` | "I know who you are, but you're not allowed" | A normal wristband at the VIP tent |

With a `401`, also send the `WWW-Authenticate: Bearer` header: it tells the client **how** to log in.

## Safety rules for real apps 🛡️

- **Same error for a wrong email and a wrong password** ("Wrong email or password"), so attackers can't find out which emails have accounts.
- **Never send the hash back**, not even in "your account" replies.
- **Keep the secret secret**: in an environment variable (`process.env.JWT_SECRET`), never in your code or on GitHub.
- **Use HTTPS** everywhere, so tokens can't be read on the way.
- In the browser, the safest place for a token is an **httpOnly cookie** (JavaScript can't read it, so an attacker's script can't steal it). That's how DevPrep, this very app, keeps you logged in!

## Remember ✅

- Store `bcrypt.hash(password, 10)`, never the password; check logins with `bcrypt.compare`.
- A JWT is a signed wristband: header.payload.signature. Anyone can **read** it; only the secret can **make** it.
- `jwt.sign(payload, secret, { expiresIn })` at login; `jwt.verify(token, secret)` throws if it's fake or expired.
- Clients send `Authorization: Bearer <token>`; a `requireAuth` middleware guards protected routes.
- `401` = who are you? (+ `WWW-Authenticate: Bearer`); `403` = not allowed. `409` = that email is taken.
