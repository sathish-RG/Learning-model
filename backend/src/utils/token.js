import jwt from 'jsonwebtoken';
import env from '../config/env.js';

export const AUTH_COOKIE = 'token';

const cookieOptions = {
  httpOnly: true, // not readable from JavaScript, so XSS can't steal it
  secure: env.cookieSecure,
  sameSite: env.cookieSameSite,
  path: '/',
};

export const signToken = (userId) =>
  jwt.sign({ sub: userId.toString() }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });

// Throws JsonWebTokenError / TokenExpiredError, which errorHandler maps to 401
export const verifyToken = (token) => jwt.verify(token, env.jwtSecret);

// Signs a token and sends it as an httpOnly cookie that expires together with the JWT
export const setAuthCookie = (res, userId) => {
  const token = signToken(userId);
  const { exp } = jwt.decode(token);
  res.cookie(AUTH_COOKIE, token, { ...cookieOptions, expires: new Date(exp * 1000) });
};

// Options must match the ones used to set the cookie, or the browser keeps it
export const clearAuthCookie = (res) => {
  res.clearCookie(AUTH_COOKIE, cookieOptions);
};
