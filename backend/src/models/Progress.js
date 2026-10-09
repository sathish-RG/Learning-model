import mongoose from 'mongoose';

export const PROGRESS_STATUSES = ['pending', 'completed'];

const progressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true },
    status: { type: String, enum: PROGRESS_STATUSES, default: 'pending' },
    userSavedCode: { type: String, default: '' },
    completedAt: { type: Date, default: null },
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

// One progress record per user per topic; also serves "all progress for a user" queries
progressSchema.index({ user: 1, topic: 1 }, { unique: true });

// Keep completedAt consistent with status
progressSchema.pre('save', function syncCompletedAt() {
  if (!this.isModified('status')) return;
  this.completedAt = this.status === 'completed' ? (this.completedAt ?? new Date()) : null;
});

export default mongoose.model('Progress', progressSchema);
