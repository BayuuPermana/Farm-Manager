import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['manager', 'caretaker', 'veterinarian'],
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  assignedAreas: [{
    type: String,
    required: true
  }],
  schedule: [{
    date: Date,
    shift: {
      type: String,
      enum: ['morning', 'afternoon', 'night']
    },
    area: String,
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'absent'],
      default: 'scheduled'
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Staff', staffSchema);