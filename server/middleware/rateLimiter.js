import rateLimit from 'express-rate-limit';

// Strict rate limiter for authentication endpoints (signin/signup)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: 'Too many authentication attempts from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
});

// Moderate rate limiter for user creation
export const createUserLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 user creations per hour
  message: 'Too many accounts created from this IP, please try again after an hour',
  standardHeaders: true,
  legacyHeaders: false,
});

// General API rate limiter
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: 'Too many requests from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter limiter for write operations (POST/PUT/DELETE)
export const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // 50 write operations per window
  message: 'Too many write requests from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

// Admin action limiter
export const adminLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 20, // 20 admin actions per window
  message: 'Too many admin requests from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

// Contact form submission limiter (prevent spam)
export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 contact submissions per hour
  message: 'Too many contact form submissions from this IP, please try again after an hour',
  standardHeaders: true,
  legacyHeaders: false,
});

// Delete operation limiter (very strict)
export const deleteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 delete operations per window
  message: 'Too many delete requests from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

// Public read operations limiter (more lenient)
export const readLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // 200 read operations per window
  message: 'Too many requests from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});
