import mongoose from 'mongoose';
import { connectDB, disconnectDB } from './config/db.js';
import Topic from './models/Topic.js';
import Progress from './models/Progress.js';
import Streak from './models/Streak.js';
import User from './models/User.js';
import curriculum from './data/curriculum.js';

// Syncs the Topic collection with data/curriculum.js.
//
//   npm run seed         Safe for content updates: upserts topics by slug, so their _ids (and
//                        everyone's progress) survive; removes topics no longer in the course.
//   npm run seed:reset   Full reset for a new course structure: deletes ALL topics, progress
//                        and streaks, and sets every user's XP to 0, then seeds from scratch.
const RESET = process.argv.includes('--reset');

const resetEverything = async () => {
  const [topics, progress, streaks, users] = await Promise.all([
    Topic.deleteMany({}),
    Progress.deleteMany({}),
    Streak.deleteMany({}),
    User.updateMany({}, { $set: { totalXP: 0 } }),
  ]);
  console.log(
    `Reset: removed ${topics.deletedCount} topics, ${progress.deletedCount} progress records, ` +
      `${streaks.deletedCount} streaks; XP reset for ${users.matchedCount} users`,
  );
};

const syncTopics = async () => {
  // Move existing orders out of the way first, so reordering lessons
  // can't collide on the unique moduleOrder index mid-update
  await Topic.updateMany({}, [{ $set: { moduleOrder: { $multiply: ['$moduleOrder', -1] } } }], {
    updatePipeline: true,
  });

  const result = await Topic.bulkWrite(
    curriculum.map((data) => ({
      updateOne: { filter: { slug: data.slug }, update: { $set: data }, upsert: true },
    })),
  );

  // Remove topics that are no longer in the curriculum, plus their progress records
  const slugs = curriculum.map((t) => t.slug);
  const stale = await Topic.find({ slug: { $nin: slugs } }, '_id slug');
  if (stale.length) {
    const staleIds = stale.map((t) => t._id);
    await Progress.deleteMany({ topic: { $in: staleIds } });
    await Topic.deleteMany({ _id: { $in: staleIds } });
  }

  console.log(
    `Topics seeded: ${result.upsertedCount} inserted, ${result.modifiedCount} updated, ${stale.length} removed` +
      (stale.length ? ` (${stale.map((t) => t.slug).join(', ')})` : ''),
  );
};

const printSummary = async () => {
  const phases = await Topic.aggregate([
    { $sort: { moduleOrder: 1 } },
    {
      $group: {
        _id: '$phase',
        phaseTitle: { $first: '$phaseTitle' },
        lessons: { $sum: { $cond: [{ $eq: ['$lessonType', 'lesson'] }, 1, 0] } },
        checkpoints: { $sum: { $cond: [{ $eq: ['$lessonType', 'checkpoint'] }, 1, 0] } },
        published: { $sum: { $cond: ['$published', 1, 0] } },
        orders: { $push: '$moduleOrder' },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  console.table(
    phases.map(({ phaseTitle, lessons, checkpoints, published, orders }) => ({
      phase: phaseTitle,
      lessons,
      checkpoints,
      published,
      order: `${orders[0]}–${orders[orders.length - 1]}`,
    })),
  );
};

const seed = async () => {
  await connectDB();
  await Topic.syncIndexes();

  // Validate everything up front so a bad entry can't leave the collection half-updated
  await Promise.all(curriculum.map((data) => new Topic(data).validate()));

  if (RESET) await resetEverything();
  await syncTopics();
  await printSummary();
};

seed()
  .catch((err) => {
    console.error('Seeding failed:', err.message);
    process.exitCode = 1;
  })
  .finally(() => mongoose.connection.readyState && disconnectDB());
