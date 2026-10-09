import mongoose from 'mongoose';
import { connectDB, disconnectDB } from './config/db.js';
import Topic from './models/Topic.js';
import Progress from './models/Progress.js';
import curriculum from './data/curriculum.js';

// Syncs the Topic collection with data/curriculum.js. Run with: npm run seed
//
// Topics are upserted by slug instead of deleted and re-inserted: a fresh insert would
// give every topic a new _id and orphan all existing Progress records that point to it.
const seed = async () => {
  await connectDB();
  await Topic.syncIndexes();

  // Validate everything up front so a bad entry can't leave the collection half-updated
  await Promise.all(curriculum.map((data) => new Topic(data).validate()));

  // Move existing orders out of the way first, so reordering modules
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

  const topics = await Topic.find({}, 'moduleOrder slug templateType').sort('moduleOrder').lean();
  console.table(topics.map(({ moduleOrder, slug, templateType }) => ({ moduleOrder, slug, templateType })));
};

seed()
  .catch((err) => {
    console.error('Seeding failed:', err.message);
    process.exitCode = 1;
  })
  .finally(() => mongoose.connection.readyState && disconnectDB());
