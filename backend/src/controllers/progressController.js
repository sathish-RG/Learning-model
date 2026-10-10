import Progress from '../models/Progress.js';
import Topic from '../models/Topic.js';
import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { getStreakView, recordActivity } from './streakController.js';

const findTopicBySlug = async (slug) => {
  const topic = await Topic.findOne({ slug }, '_id xpReward');
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

// Grants the topic's XP at most once. The conditional update is atomic, so only one request
// can claim the reward, even with double-clicks or parallel requests; only the winner adds XP.
// (A crash between the two writes can lose a reward, but never duplicate it.)
const awardXpOnce = async (userId, progressId, amount) => {
  const claim = await Progress.updateOne(
    { _id: progressId, xpAwardedAt: null },
    { $set: { xpAwardedAt: new Date(), xpEarned: amount } },
  );
  if (claim.modifiedCount === 0) return null;

  const user = await User.findByIdAndUpdate(userId, { $inc: { totalXP: amount } }, { returnDocument: 'after' });
  return user.totalXP;
};

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
// Responds with xpEarned (> 0 only on a topic's first completion) and the user's totalXP
export const updateStatus = async (req, res) => {
  const topic = await findTopicBySlug(req.params.slug);
  const progress = await getOrCreateProgress(req.user._id, topic._id);

  const completing = req.body.status === 'completed';

  progress.status = req.body.status;
  await progress.save(); // the model keeps completedAt in sync

  const totalXPAfterAward = completing ? await awardXpOnce(req.user._id, progress._id, topic.xpReward) : null;
  const xpEarned = totalXPAfterAward === null ? 0 : topic.xpReward;
  const totalXP = totalXPAfterAward ?? req.user.totalXP;

  // Completing counts towards the streak; reopening a topic doesn't
  const streak = completing ? await recordActivity(req) : await getStreakView(req);

  // Re-read so the summary includes the XP claim made above
  const updated = await Progress.findById(progress._id);
  sendSuccess(res, { progress: toSummary(updated), streak, xpEarned, totalXP }, 'Status updated');
};
