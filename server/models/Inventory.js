import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['feed', 'medicine', 'equipment'],
    required: true
  },
  currentStock: {
    type: Number,
    required: true,
    min: 0
  },
  unit: {
    type: String,
    required: true
  },
  minimumStock: {
    type: Number,
    required: true,
    min: 0
  },
  expirationDate: {
    type: Date,
    required: function() {
      return this.type === 'feed' || this.type === 'medicine';
    }
  },
  supplier: {
    name: String,
    contact: String
  },
  lastRestocked: {
    date: Date,
    quantity: Number,
    by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

inventorySchema.index({ name: 'text' });

export default mongoose.model('Inventory', inventorySchema);