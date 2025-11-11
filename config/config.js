const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET,
    mongoUri: process.env.MONGODB_URI || 
    'mongodb://' + (process.env.IP || 'localhost') + ':' +
    (process.env.MONGO_PORT || '27017') +
    '/mernproject'
}

// Validate required environment variables
if (!config.jwtSecret) {
    throw new Error('JWT_SECRET environment variable is required');
}

if (!config.mongoUri || config.mongoUri.includes('localhost')) {
    console.warn('⚠️  WARNING: Using local MongoDB. Set MONGODB_URI environment variable for production.');
}

export default config