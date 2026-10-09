import { Router } from 'express';
import { getTopics } from '../controllers/topicController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', protect, getTopics);

export default router;
