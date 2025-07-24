import dotenv from 'dotenv'
import config from './config/config.js'
import app from './server/express.js'
import mongoose from 'mongoose'

// Load environment variables
dotenv.config()

mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, { 
  useNewUrlParser: true,
  //useCreateIndex: true,
  //useUnifiedTopology: true
}).then(() => {
  console.log("Connected to the database!");
})
mongoose.connection.on('error', () => {
throw new Error(`unable to connect to database: ${config.mongoUri}`)
})

// Removed the conflicting route - express.js now handles serving the React app

app.listen(config.port, (err) => {
if (err) {
console.log(err)
}
console.info('Server started on port %s.', config.port)
})