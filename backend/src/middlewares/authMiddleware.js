import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';
import { AUTH_COOKIE, verifyToken } from '../utils/token.js';

// Requires a valid auth cookie and attaches the user to req.user
export const protect = async (req, res, next) => {
  const token = req.cookies?.[AUTH_COOKIE];

  if (!token) throw ApiError.unauthorized('Not authenticated');

  const { sub } = verifyToken(token);
  const user = await User.findById(sub);

  // The token is valid but the account was deleted after it was issued
  if (!user) throw ApiError.unauthorized('User no longer exists');

  req.user = user;
  next();
};
