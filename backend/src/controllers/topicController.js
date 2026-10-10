import Topic from '../models/Topic.js';
import ApiError from '../utils/ApiError.js';
import { sendSuccess } from '../utils/apiResponse.js';

// Lesson bodies and files are only sent per topic, so the path stays light as the course grows
const SUMMARY_FIELDS = '-lessonContent -instructions -files';

// GET /api/v1/topics (protected) - the whole course in learning order, as summaries
export const getTopics = async (req, res) => {
  const topics = await Topic.find().sort({ moduleOrder: 1 }).select(SUMMARY_FIELDS);
  sendSuccess(res, { topics });
};

// GET /api/v1/topics/:slug (protected) - one topic with its lesson, instructions and files
export const getTopic = async (req, res) => {
  const topic = await Topic.findOne({ slug: req.params.slug });
  if (!topic) throw ApiError.notFound('Topic not found');
  sendSuccess(res, { topic });
};
