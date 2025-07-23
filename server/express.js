import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import expressStaticGzip from 'express-static-gzip';
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

// Enhanced compression middleware
app.use(compress({
    filter: (req, res) => {
        // Don't compress responses if this request has a "no-transform" cache control directive
        if (req.headers['cache-control'] && req.headers['cache-control'].includes('no-transform')) {
            return false;
        }
        // Use compression filter function
        return compress.filter(req, res);
    },
    level: 6, // Compression level (1-9, 6 is default)
    threshold: 1024, // Only compress if response is larger than 1KB
    windowBits: 15, // Value for zlib window size
    memLevel: 8, // Memory usage level
}));

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

// Serve static files from client/dist with pre-compressed support
app.use('/', expressStaticGzip(path.join(__dirname, '..', 'client', 'dist'), {
    enableBrotli: true,
    orderPreference: ['br', 'gz'],
    setHeaders: (res, path) => {
        // Set caching headers for JavaScript and CSS bundles
        if (path.endsWith('.js') || path.endsWith('.css')) {
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        } else if (path.endsWith('.html')) {
            res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 hour for HTML
        }
    }
}));

// Serve static files from client/public directory with advanced compression
app.use('/res', expressStaticGzip(path.join(__dirname, '..', 'client', 'public', 'res'), {
    enableBrotli: true,
    orderPreference: ['br', 'gz'],
    setHeaders: (res, path) => {
        // Set caching headers for better performance
        if (path.endsWith('.js') || path.endsWith('.css')) {
            res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year
        } else if (path.endsWith('.png') || path.endsWith('.jpg') || path.endsWith('.jpeg') || path.endsWith('.svg')) {
            res.setHeader('Cache-Control', 'public, max-age=2592000'); // 30 days
        } else if (path.endsWith('.pdf')) {
            res.setHeader('Cache-Control', 'public, max-age=86400'); // 1 day
        }
    }
}));

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

export default app;