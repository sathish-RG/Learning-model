import mongoose from 'mongoose';

export const TEMPLATE_TYPES = ['static', 'vanilla', 'react', 'node'];
export const LESSON_TYPES = ['lesson', 'checkpoint'];
// What appears next to the editor: the page, a console for console.log output, or both.
// 'none': a read-only project to browse in a file tree instead (the Capstone)
export const OUTPUT_PANELS = ['preview', 'console', 'both', 'none'];
export const PHASE_COUNT = 8;

// One file in the practice editor. Paths are Sandpack-style, e.g. "/index.html".
const fileSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
      trim: true,
      match: [/^\/[\w\-./]+$/, 'Filename must be a path starting with "/", e.g. /index.html'],
    },
    content: { type: String, default: '' },
    readOnly: { type: Boolean, default: false }, // shown but locked (e.g. the HTML in CSS lessons)
    hidden: { type: Boolean, default: false }, // used by the preview but not shown as a tab
  },
  { _id: false },
);

const topicSchema = new mongoose.Schema(
  {
    // Stable, URL-friendly id (e.g. "your-first-web-page"); the seeder matches on it
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9-]+$/, 'Slug may contain only lowercase letters, numbers and hyphens'],
    },
    title: { type: String, required: true, trim: true },
    // One sentence: the isolated practice task
    description: { type: String, required: true, trim: true },
    // Position in the whole course (1..n), used for ordering and "next lesson"
    moduleOrder: { type: Number, required: true, unique: true, min: 1 },
    phase: { type: Number, required: true, min: 1, max: PHASE_COUNT },
    phaseTitle: { type: String, required: true, trim: true },
    lessonType: { type: String, enum: LESSON_TYPES, default: 'lesson' },
    // Unpublished lessons appear on the path as "coming soon" until their content is written
    published: { type: Boolean, default: false },
    // Checkpoints only: what this adds to the Task Manager Pro project
    milestone: { type: String, default: '' },
    subtopics: { type: [String], default: [] },
    templateType: { type: String, required: true, enum: TEMPLATE_TYPES },
    output: { type: String, enum: OUTPUT_PANELS, default: 'preview' },
    files: { type: [fileSchema], default: [] },
    // Extra npm packages for the practice sandbox, e.g. { "react-router-dom": "^6.26.0" }
    dependencies: { type: mongoose.Schema.Types.Mixed, default: {} },
    // Markdown, rendered as plain text + formatting on the client (no raw HTML)
    lessonContent: { type: String, default: '' },
    instructions: { type: String, default: '' },
    xpReward: { type: Number, default: 20, min: 0 },
    // When set, the practice step offers every visible file as a .zip with this name
    download: { type: String, default: '', trim: true },
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

topicSchema.index({ phase: 1, moduleOrder: 1 });

// Files the learner may edit (and therefore save)
topicSchema.methods.editableFilenames = function editableFilenames() {
  return this.files.filter((f) => !f.readOnly && !f.hidden).map((f) => f.filename);
};

topicSchema.pre('validate', function checkLesson() {
  const names = this.files.map((f) => f.filename);
  if (new Set(names).size !== names.length) this.invalidate('files', 'File names must be unique within a lesson');

  // A published lesson must be complete enough to learn from and practice
  if (!this.published) return;
  if (!this.lessonContent.trim()) this.invalidate('lessonContent', 'A published lesson needs lessonContent');
  if (!this.instructions.trim()) this.invalidate('instructions', 'A published lesson needs instructions');
  // (A read-only project, output 'none', is browsed and downloaded rather than edited)
  if (this.output === 'none') {
    if (!this.files.length) this.invalidate('files', 'A published project needs files');
  } else if (!this.editableFilenames().length) {
    this.invalidate('files', 'A published lesson needs at least one editable file');
  }
  if (this.lessonType === 'checkpoint' && !this.milestone.trim()) {
    this.invalidate('milestone', 'A published checkpoint needs a milestone');
  }
});

export default mongoose.model('Topic', topicSchema);
