import Progress from '../models/Progress.js';
import Topic from '../models/Topic.js';
import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { getStreakView, recordActivity } from './streakController.js';

const findTopicBySlug = async (slug, fields = '_id') => {
  const topic = await Topic.findOne({ slug }, fields);
  if (!topic) throw ApiError.notFound('Topic not found');
  return topic;
};

// Progress can only be recorded for lessons that are actually available
const findPublishedTopic = async (slug, fields) => {
  const topic = await findTopicBySlug(slug, `${fields} published`);
  if (!topic.published) throw ApiError.badRequest("This lesson isn't available yet");
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

// Progress without the (potentially large) saved files
const toSummary = (progress) => {
  const { savedFiles, ...summary } = progress.toJSON();
  return summary;
};

// GET /api/v1/progress - status of every topic the user has touched (no code)
export const getAllProgress = async (req, res) => {
  const progress = await Progress.find({ user: req.user._id }).select('-savedFiles');
  sendSuccess(res, { progress });
};

// GET /api/v1/progress/:slug - one topic, including saved files (null if never touched)
export const getTopicProgress = async (req, res) => {
  const topic = await findTopicBySlug(req.params.slug);
  const progress = await Progress.findOne({ user: req.user._id, topic: topic._id });
  sendSuccess(res, { progress });
};

// PUT /api/v1/progress/:slug/files  { files: [{ filename, content }] }
// Only the lesson's editable files can be saved (never read-only or hidden ones).
export const saveFiles = async (req, res) => {
  const topic = await findPublishedTopic(req.params.slug, '_id files');
  const editable = new Set(topic.editableFilenames());
  const { files } = req.body;

  const names = files.map((f) => f.filename);
  const invalid = names.filter((name) => !editable.has(name));
  if (invalid.length) {
    throw ApiError.badRequest(
      'These files are not editable in this lesson',
      invalid.map((filename) => ({ field: 'files', message: filename })),
    );
  }
  if (new Set(names).size !== names.length) throw ApiError.badRequest('Each file can only be sent once');

  const progress = await getOrCreateProgress(req.user._id, topic._id);
  progress.savedFiles = files.map(({ filename, content }) => ({ filename, content }));
  await progress.save();

  const streak = await recordActivity(req);
  sendSuccess(res, { progress: toSummary(progress), streak }, 'Files saved');
};

// PUT /api/v1/progress/:slug/status  { status: 'completed' | 'pending' }
// Responds with xpEarned (> 0 only on a topic's first completion) and the user's totalXP
export const updateStatus = async (req, res) => {
  const topic = await findPublishedTopic(req.params.slug, '_id xpReward');
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
