import dotenv from 'dotenv'
import config from './config/config.js'
import app from './server/express.js'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Serve the client application (catch-all handler for client-side routing)
app.get('*', (req, res) => {
  // If it's an API route, don't serve the client
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ message: "API route not found" });
  }
  
  // For all other routes, serve the client app
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.listen(config.port, (err) => {
if (err) {
console.log(err)
}
console.info('Server started on port %s.', config.port)
})