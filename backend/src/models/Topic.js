import mongoose from 'mongoose';

export const TEMPLATE_TYPES = ['static', 'vanilla', 'react', 'node'];
export const PHASES = ['foundations', 'react', 'backend'];

const topicSchema = new mongoose.Schema(
  {
    // Stable, URL-friendly id (e.g. "core-javascript"); the seeder matches on it
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9-]+$/, 'Slug may contain only lowercase letters, numbers and hyphens'],
    },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    moduleOrder: { type: Number, required: true, unique: true, min: 1, max: 7 },
    phase: { type: String, required: true, enum: PHASES },
    // What this module adds to the Task Manager Pro project
    milestone: { type: String, required: true },
    subtopics: { type: [String], default: [] },
    templateType: { type: String, required: true, enum: TEMPLATE_TYPES },
    starterCode: { type: String, default: '' },
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

export default mongoose.model('Topic', topicSchema);
