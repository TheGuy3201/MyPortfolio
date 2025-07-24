import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import userRoutes from './routes/users.routes.js';
import projectRoutes from './routes/projects.routes.js';
import educationRoutes from './routes/educations.routes.js';
import contactsRoutes from './routes/contacts.routes.js';
import servicesRoutes from './routes/services.routes.js';
import authRoutes from './routes/auth.routes.js'; // Import authRoutes

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet({
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https:"],
            scriptSrc: ["'self'"],
            objectSrc: ["'none'"],
            imgSrc: ["'self'", "data:", "https:", "http:"],
            fontSrc: ["'self'", "https:", "data:"],
        },
    },
}));
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}));

// Serve static files from client/public directory
app.use('/res', express.static(path.join(__dirname, '..', 'client', 'public', 'res')));

// Serve static files from the built React app
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

// Register routes with the correct base paths
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/educations', educationRoutes);
app.use('/api/contacts', contactsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/auth', authRoutes); // Register authRoutes

// Optional: Also mount userRoutes and authRoutes at root if needed
// app.use('/', userRoutes);
// app.use('/', authRoutes);

// Catch-all handler: send back React's index.html file for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ "error": err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ "error": err.name + ": " + err.message });
    console.log(err);
  }
});

export default app;