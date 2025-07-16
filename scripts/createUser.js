import mongoose from 'mongoose';
import config from '../config/config.js';
import User from '../server/models/users.model.js';

// Connect to MongoDB
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
}).then(() => {
  console.log("Connected to the database!");
}).catch((err) => {
  console.error("Database connection error:", err);
  process.exit(1);
});

// Create regular user
const createUser = async () => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: 'user@portfolio.com' });
    
    if (existingUser) {
      console.log('Regular user already exists');
      process.exit(0);
    }

    // Create new regular user
    const user = new User({
      name: 'Regular User',
      email: 'user@portfolio.com',
      password: 'user123456', // This will be hashed by the virtual setter
      role: 'user'
    });

    await user.save();
    console.log('Regular user created successfully!');
    console.log('Email: user@portfolio.com');
    console.log('Password: user123456');
    
  } catch (error) {
    console.error('Error creating regular user:', error);
  } finally {
    mongoose.disconnect();
  }
};

createUser();
