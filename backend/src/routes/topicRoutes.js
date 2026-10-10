import { Router } from 'express';
import { param } from 'express-validator';
import { getTopic, getTopics } from '../controllers/topicController.js';
import { protect } from '../middlewares/authMiddleware.js';
import validateRequest from '../middlewares/validateRequest.js';

const router = Router();

router.use(protect);

router.get('/', getTopics);
router.get('/:slug', param('slug').matches(/^[a-z0-9-]+$/).withMessage('Invalid topic'), validateRequest, getTopic);

export default router;
