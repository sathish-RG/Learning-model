import Streak from '../models/Streak.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { resolveTimeZone } from '../utils/dates.js';

const timeZoneOf = (req) => resolveTimeZone(req.get('X-Timezone'));

// Records an activity for req.user and returns the updated streak (used by progress actions)
export const recordActivity = async (req) => {
  const timeZone = timeZoneOf(req);
  const streak = await Streak.forUser(req.user._id);
  await streak.recordActivity(timeZone).save();
  return streak.toView(timeZone);
};

// Read-only view; users with no activity yet get an unsaved, empty streak
export const getStreakView = async (req) => {
  const streak = (await Streak.findOne({ user: req.user._id })) ?? new Streak({ user: req.user._id });
  return streak.toView(timeZoneOf(req));
};

// GET /api/v1/streak
export const getStreak = async (req, res) => {
  sendSuccess(res, { streak: await getStreakView(req) });
};
