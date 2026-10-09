import { Router } from 'express';
import { body } from 'express-validator';
import rateLimit from 'express-rate-limit';
import { getMe, login, logout, register } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';
import validateRequest from '../middlewares/validateRequest.js';

const router = Router();

// Stricter limit than the global one to slow down password guessing
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { success: false, message: 'Too many attempts, please try again later' },
});

const emailRule = body('email').trim().isEmail().withMessage('A valid email is required').normalizeEmail({ gmail_remove_dots: false });

const registerRules = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 50 }).withMessage('Name must be at most 50 characters'),
  emailRule,
  body('password').isLength({ min: 8, max: 128 }).withMessage('Password must be 8-128 characters'),
];

const loginRules = [emailRule, body('password').notEmpty().withMessage('Password is required')];

router.post('/register', authLimiter, registerRules, validateRequest, register);
router.post('/login', authLimiter, loginRules, validateRequest, login);
router.post('/logout', logout);
router.get('/me', protect, getMe);

export default router;
