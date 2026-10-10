import { Router } from 'express';
import { body, param } from 'express-validator';
import { getAllProgress, getTopicProgress, saveFiles, updateStatus } from '../controllers/progressController.js';
import { protect } from '../middlewares/authMiddleware.js';
import validateRequest from '../middlewares/validateRequest.js';
import { PROGRESS_STATUSES } from '../models/Progress.js';

const router = Router();

const MAX_FILE_LENGTH = 100_000;
const MAX_FILES = 20;

const slugRule = param('slug').matches(/^[a-z0-9-]+$/).withMessage('Invalid topic');

router.use(protect);

router.get('/', getAllProgress);
router.get('/:slug', slugRule, validateRequest, getTopicProgress);
router.put(
  '/:slug/files',
  slugRule,
  body('files').isArray({ min: 1, max: MAX_FILES }).withMessage(`Send between 1 and ${MAX_FILES} files`),
  body('files.*.filename').isString().withMessage('Each file needs a filename'),
  body('files.*.content')
    .isString()
    .withMessage('File content must be a string')
    .isLength({ max: MAX_FILE_LENGTH })
    .withMessage(`Each file must be at most ${MAX_FILE_LENGTH.toLocaleString('en-US')} characters`),
  validateRequest,
  saveFiles,
);
router.put(
  '/:slug/status',
  slugRule,
  body('status').isIn(PROGRESS_STATUSES).withMessage(`Status must be one of: ${PROGRESS_STATUSES.join(', ')}`),
  validateRequest,
  updateStatus,
);

export default router;
