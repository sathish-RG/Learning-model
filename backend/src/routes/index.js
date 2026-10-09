import { Router } from 'express';
import healthRoutes from './healthRoutes.js';
import authRoutes from './authRoutes.js';
import topicRoutes from './topicRoutes.js';
import progressRoutes from './progressRoutes.js';
import streakRoutes from './streakRoutes.js';

// Central API router — mount each resource's routes here
const router = Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/topics', topicRoutes);
router.use('/progress', progressRoutes);
router.use('/streak', streakRoutes);

export default router;
