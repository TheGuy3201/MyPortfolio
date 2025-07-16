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

// Create admin user
const createAdmin = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@portfolio.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create new admin user
    const admin = new User({
      name: 'Admin User',
      email: 'admin@portfolio.com',
      password: 'admin123456', // This will be hashed by the virtual setter
      role: 'admin'
    });

    await admin.save();
    console.log('Admin user created successfully!');
    console.log('Email: admin@portfolio.com');
    console.log('Password: admin123456');
    
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    mongoose.disconnect();
  }
};

createAdmin();
