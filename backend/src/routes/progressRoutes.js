import { Router } from 'express';
import { body, param } from 'express-validator';
import { getAllProgress, getTopicProgress, saveCode, updateStatus } from '../controllers/progressController.js';
import { protect } from '../middlewares/authMiddleware.js';
import validateRequest from '../middlewares/validateRequest.js';
import { PROGRESS_STATUSES } from '../models/Progress.js';

const router = Router();

const MAX_CODE_LENGTH = 100_000;

const slugRule = param('slug').matches(/^[a-z0-9-]+$/).withMessage('Invalid topic');

router.use(protect);

router.get('/', getAllProgress);
router.get('/:slug', slugRule, validateRequest, getTopicProgress);
router.put(
  '/:slug/code',
  slugRule,
  body('code')
    .isString()
    .withMessage('Code must be a string')
    .isLength({ max: MAX_CODE_LENGTH })
    .withMessage(`Code must be at most ${MAX_CODE_LENGTH.toLocaleString('en-US')} characters`),
  validateRequest,
  saveCode,
);
router.put(
  '/:slug/status',
  slugRule,
  body('status').isIn(PROGRESS_STATUSES).withMessage(`Status must be one of: ${PROGRESS_STATUSES.join(', ')}`),
  validateRequest,
  updateStatus,
);

export default router;
