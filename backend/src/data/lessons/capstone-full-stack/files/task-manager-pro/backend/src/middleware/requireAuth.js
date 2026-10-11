// The guard at the stage: checks the wristband (the JWT in the httpOnly cookie).
const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Please log in" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.sub;
    next();
  } catch {
    res.status(401).json({ error: "Your session has expired. Please log in again." });
  }
}

module.exports = requireAuth;
