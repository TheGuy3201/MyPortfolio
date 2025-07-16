import mongoose from 'mongoose';

const ContactsSchema = new mongoose.Schema({
  fullName: {
    type: String,
    trim: true,
    required: 'Full name is required'
  },
  email: {
    type: String,
    trim: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required'
  },
  message: {
    type: String,
    trim: true,
    required: 'Message is required'
  },
  phone: {
    type: String,
    trim: true
  },
  subject: {
    type: String,
    trim: true
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
ContactsSchema.pre('save', function(next) {
  this.updated = Date.now();
  next();
});

export default mongoose.model('Contact', ContactsSchema);