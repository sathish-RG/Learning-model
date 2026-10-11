// Locked: a small version of the "jsonwebtoken" npm package, built with Node's crypto module,
// so you can see there's no magic inside a JWT. (The real package can't run in this sandbox.)
// In a real project, `npm install jsonwebtoken` gives you the same two functions:
//
//   jwt.sign(payload, secret, { expiresIn: "1h" })  → "xxxxx.yyyyy.zzzzz"
//   jwt.verify(token, secret)                       → the payload, or it throws an error
const crypto = require("crypto");

// base64url: base64 made safe for URLs and headers (no +, / or = characters)
const toBase64url = (base64) => base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const encode = (object) => toBase64url(Buffer.from(JSON.stringify(object)).toString("base64"));
const decode = (part) => JSON.parse(Buffer.from(part.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString());

// The signature: a fingerprint of header.payload that only someone with the secret can make
const sign256 = (data, secret) => toBase64url(crypto.createHmac("sha256", secret).update(data).digest("base64"));

// Compares every character, so the time it takes doesn't reveal how much of a guess was right
const sameText = (a, b) => {
  if (a.length !== b.length) return false;
  let difference = 0;
  for (let i = 0; i < a.length; i++) difference |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return difference === 0;
};

const SECONDS = { s: 1, m: 60, h: 3600, d: 86400 };
const toSeconds = (value) => {
  if (typeof value === "number") return value;
  const match = /^(\d+)([smhd])$/.exec(value);
  if (!match) throw new Error(`expiresIn should look like "30s", "15m", "1h" or "7d", not "${value}"`);
  return Number(match[1]) * SECONDS[match[2]];
};

class JsonWebTokenError extends Error {
  constructor(message) {
    super(message);
    this.name = "JsonWebTokenError";
  }
}
class TokenExpiredError extends JsonWebTokenError {
  constructor(expiredAt) {
    super("jwt expired");
    this.name = "TokenExpiredError";
    this.expiredAt = expiredAt;
  }
}

function sign(payload, secret, { expiresIn } = {}) {
  const issuedAt = Math.floor(Date.now() / 1000); // JWTs count time in seconds
  const body = { ...payload, iat: issuedAt };
  if (expiresIn !== undefined) body.exp = issuedAt + toSeconds(expiresIn);

  const data = `${encode({ alg: "HS256", typ: "JWT" })}.${encode(body)}`;
  return `${data}.${sign256(data, secret)}`;
}

function verify(token, secret) {
  const parts = String(token).split(".");
  if (parts.length !== 3) throw new JsonWebTokenError("jwt malformed");

  const [header, body, signature] = parts;
  if (!sameText(signature, sign256(`${header}.${body}`, secret))) {
    throw new JsonWebTokenError("invalid signature"); // changed, or signed with another secret
  }

  let payload;
  try {
    payload = decode(body);
  } catch {
    throw new JsonWebTokenError("jwt malformed");
  }
  if (payload.exp !== undefined && Date.now() / 1000 >= payload.exp) {
    throw new TokenExpiredError(new Date(payload.exp * 1000));
  }
  return payload;
}

module.exports = { sign, verify, JsonWebTokenError, TokenExpiredError };
