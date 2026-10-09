import mongoose from 'mongoose';
import { daysBetween, toDayKey } from '../utils/dates.js';

const streakSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    currentStreak: { type: Number, default: 0, min: 0 },
    maxStreak: { type: Number, default: 0, min: 0 },
    lastActiveDate: { type: Date, default: null },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        return ret;
      },
    },
  },
);

// Atomically fetches the user's streak, creating it on first use
streakSchema.statics.forUser = function forUser(userId) {
  return this.findOneAndUpdate(
    { user: userId },
    { $setOnInsert: { currentStreak: 0 } },
    { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
  );
};

// Counts one activity (saving code, completing a topic). Several on the same day count once.
streakSchema.methods.recordActivity = function recordActivity(timeZone, now = new Date()) {
  const today = toDayKey(now, timeZone);
  const gap = this.lastActiveDate ? daysBetween(toDayKey(this.lastActiveDate, timeZone), today) : null;

  if (gap === null || gap > 1) {
    this.currentStreak = 1; // first activity ever, or the streak was broken
  } else if (gap === 1) {
    this.currentStreak += 1; // active yesterday, so the streak continues
  }
  // gap <= 0: already counted today (or the time zone moved backwards)

  this.maxStreak = Math.max(this.maxStreak, this.currentStreak);
  this.lastActiveDate = now;
  return this;
};

// What the client sees. A streak not extended yesterday or today is already broken,
// so it reads as 0 even though the stored count is only reset on the next activity.
streakSchema.methods.toView = function toView(timeZone, now = new Date()) {
  const today = toDayKey(now, timeZone);
  const lastActiveDay = this.lastActiveDate ? toDayKey(this.lastActiveDate, timeZone) : null;
  const gap = lastActiveDay ? daysBetween(lastActiveDay, today) : null;

  return {
    currentStreak: gap !== null && gap <= 1 ? this.currentStreak : 0,
    maxStreak: this.maxStreak,
    activeToday: gap !== null && gap <= 0,
    lastActiveDay,
    today,
  };
};

export default mongoose.model('Streak', streakSchema);
