import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { clearAuthCookie, setAuthCookie } from '../utils/token.js';

// POST /api/v1/auth/register
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (await User.exists({ email })) {
    throw ApiError.conflict('An account with this email already exists');
  }

  const user = await User.create({ name, email, password });
  setAuthCookie(res, user._id);
  sendSuccess(res, { user }, 'Account created', 201);
};

// POST /api/v1/auth/login
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  // Same message for unknown email and wrong password, so accounts can't be probed
  if (!user || !(await user.comparePassword(password))) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  setAuthCookie(res, user._id);
  sendSuccess(res, { user }, 'Logged in');
};

// POST /api/v1/auth/logout (public, so an expired session can still log out)
export const logout = (req, res) => {
  clearAuthCookie(res);
  sendSuccess(res, null, 'Logged out');
};

// GET /api/v1/auth/me (protected)
export const getMe = (req, res) => {
  sendSuccess(res, { user: req.user });
};
