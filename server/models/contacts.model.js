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
    match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, 'Please fill a valid email address'],
    required: 'Email is required',
    maxlength: [254, 'Email must not exceed 254 characters']
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