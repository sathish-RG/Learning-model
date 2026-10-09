import Progress from '../models/Progress.js';
import Topic from '../models/Topic.js';
import ApiError from '../utils/ApiError.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { getStreakView, recordActivity } from './streakController.js';

const findTopicBySlug = async (slug) => {
  const topic = await Topic.findOne({ slug }, '_id');
  if (!topic) throw ApiError.notFound('Topic not found');
  return topic;
};

// Atomic get-or-create, so two quick requests can't create duplicate records
const getOrCreateProgress = (userId, topicId) =>
  Progress.findOneAndUpdate(
    { user: userId, topic: topicId },
    { $setOnInsert: { status: 'pending' } },
    { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
  );

// Progress without the (potentially large) saved code
const toSummary = (progress) => {
  const { userSavedCode, ...summary } = progress.toJSON();
  return summary;
};

// GET /api/v1/progress - status of every topic the user has touched (no code)
export const getAllProgress = async (req, res) => {
  const progress = await Progress.find({ user: req.user._id }).select('-userSavedCode');
  sendSuccess(res, { progress });
};

// GET /api/v1/progress/:slug - one topic, including saved code (null if never touched)
export const getTopicProgress = async (req, res) => {
  const topic = await findTopicBySlug(req.params.slug);
  const progress = await Progress.findOne({ user: req.user._id, topic: topic._id });
  sendSuccess(res, { progress });
};

// PUT /api/v1/progress/:slug/code  { code }
export const saveCode = async (req, res) => {
  const topic = await findTopicBySlug(req.params.slug);
  const progress = await getOrCreateProgress(req.user._id, topic._id);

  progress.userSavedCode = req.body.code;
  await progress.save();

  const streak = await recordActivity(req);
  sendSuccess(res, { progress: toSummary(progress), streak }, 'Code saved');
};

// PUT /api/v1/progress/:slug/status  { status: 'completed' | 'pending' }
export const updateStatus = async (req, res) => {
  const topic = await findTopicBySlug(req.params.slug);
  const progress = await getOrCreateProgress(req.user._id, topic._id);

  progress.status = req.body.status;
  await progress.save(); // the model keeps completedAt in sync

  // Completing counts towards the streak; reopening a topic doesn't
  const streak = req.body.status === 'completed' ? await recordActivity(req) : await getStreakView(req);
  sendSuccess(res, { progress: toSummary(progress), streak }, 'Status updated');
};
