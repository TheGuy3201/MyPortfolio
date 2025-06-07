const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
    mongoUri: process.env.MONGODB_URI ||
    "mongodb+srv://joshdes21:zl03V8mg5PM5JLbx@cluster0.ca5lum6.mongodb.net/MyPortfolio?retryWrites=true&w=majority&appName=Cluster0" ||
    process.env.MONGO_HOST ||
    'mongodb://' + (process.env.IP || 'localhost') + ':' +
    (process.env.MONGO_PORT || '27017') +
    '/mernproject'
}
export default config