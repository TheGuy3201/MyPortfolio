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
import rateLimit from 'express-rate-limit';
import { sanitizeBody, preventNoSQLInjection } from './middleware/validation.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Rate limiter middleware for catch-all route (serving index.html)
const catchAllLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the RateLimit-* headers
  legacyHeaders: false, // Disable the X-RateLimit-* headers
});

// Body parsing middleware with size limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(compress());

// Security middleware - apply to all routes
app.use(sanitizeBody);
app.use(preventNoSQLInjection);
// Enhanced helmet configuration for better security
app.use(helmet({
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https:"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            objectSrc: ["'none'"],
            imgSrc: ["'self'", "data:", "https:", "http:"],
            fontSrc: ["'self'", "https:", "data:"],
            connectSrc: ["'self'", "https:"],
            frameSrc: ["'none'"],
            baseUri: ["'self'"],
            formAction: ["'self'"],
        },
    },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    noSniff: true,
    xssFilter: true,
    hidePoweredBy: true,
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

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ "error": err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ "error": err.name + ": " + err.message });
    console.log(err);
  }
});


// Rate limiter middleware for robots.txt route
const robotsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
// Serve robots.txt from client/public directory
app.get('/robots.txt', robotsLimiter, (req, res) => {
  res.type('text/plain');
  res.sendFile(path.join(__dirname, '..', 'client', 'public', 'robots.txt'));
});

// Catch-all handler: send back React's index.html file for client-side routing
// This MUST come last, after all API routes and error handling
app.get('*', catchAllLimiter, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

export default app;