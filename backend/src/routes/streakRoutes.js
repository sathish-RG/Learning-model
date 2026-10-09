import { Router } from 'express';
import { getStreak } from '../controllers/streakController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', protect, getStreak);

export default router;
