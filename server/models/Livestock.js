import mongoose from 'mongoose';

const livestockSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    trim: true
  },
  count: {
    type: Number,
    required: true,
    min: 0
  },
  lastFed: {
    type: Date,
    required: true
  },
  nextFeeding: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['fed', 'unfed'],
    default: 'unfed'
  },
  assignedStaff: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff'
  }],
  healthStatus: {
    type: String,
    enum: ['healthy', 'sick', 'quarantined'],
    default: 'healthy'
  },
  notes: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

livestockSchema.index({ type: 'text' });

export default mongoose.model('Livestock', livestockSchema);