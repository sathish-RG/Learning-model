import Topic from '../models/Topic.js';
import { sendSuccess } from '../utils/apiResponse.js';

// GET /api/v1/topics (protected) - the full curriculum in learning order
export const getTopics = async (req, res) => {
  const topics = await Topic.find().sort({ moduleOrder: 1 });
  sendSuccess(res, { topics });
};
