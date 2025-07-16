import mongoose from 'mongoose';

const ServicesSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: 'Service title is required'
  },
  description: {
    type: String,
    trim: true,
    required: 'Service description is required'
  },
  icon: {
    type: String,
    trim: true,
    required: 'Service icon is required'
  },
  features: [{
    type: String,
    trim: true
  }],
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

// Update the 'updated' field before saving
ServicesSchema.pre('save', function(next) {
  this.updated = Date.now();
  next();
});

export default mongoose.model('Service', ServicesSchema);
