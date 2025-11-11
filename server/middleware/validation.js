// Input sanitization and validation middleware

// Sanitize string inputs to prevent XSS
export const sanitizeString = (str) => {
  if (typeof str !== 'string') return str;
  
  // Remove potential XSS patterns
  return str
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim();
};

// Validate email format
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
export const validatePassword = (password) => {
  if (typeof password !== 'string' || password.length < 8) {
    return {
      valid: false,
      message: 'Password must be at least 8 characters long'
    };
  }
  
  // Check for at least one number, one uppercase, one lowercase
  const hasNumber = /\d/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  if (!hasNumber || !hasUpper || !hasLower) {
    return {
      valid: false,
      message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    };
  }
  
  return { valid: true };
};

// Middleware to sanitize request body
export const sanitizeBody = (req, res, next) => {
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = sanitizeString(req.body[key]);
      }
    });
  }
  next();
};

// Validate user input for creation/update
export const validateUserInput = (req, res, next) => {
  const { email, password, name } = req.body;
  
  // Validate name
  if (name !== undefined) {
    if (typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({
        error: 'Name must be at least 2 characters long'
      });
    }
    if (name.length > 100) {
      return res.status(400).json({
        error: 'Name must not exceed 100 characters'
      });
    }
  }
  
  // Validate email
  if (email !== undefined) {
    if (!validateEmail(email)) {
      return res.status(400).json({
        error: 'Please provide a valid email address'
      });
    }
  }
  
  // Validate password (only on creation or when password is being changed)
  if (password !== undefined) {
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return res.status(400).json({
        error: passwordValidation.message
      });
    }
  }
  
  next();
};

// Validate contact form input
export const validateContactInput = (req, res, next) => {
  const { name, email, message } = req.body;
  
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({
      error: 'Name is required and must be at least 2 characters'
    });
  }
  
  if (!email || !validateEmail(email)) {
    return res.status(400).json({
      error: 'A valid email address is required'
    });
  }
  
  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    return res.status(400).json({
      error: 'Message is required and must be at least 10 characters'
    });
  }
  
  if (message.length > 5000) {
    return res.status(400).json({
      error: 'Message must not exceed 5000 characters'
    });
  }
  
  next();
};

// Prevent MongoDB injection
export const preventNoSQLInjection = (req, res, next) => {
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      const value = req.body[key];
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        // Check for MongoDB operators
        const hasOperator = Object.keys(value).some(k => k.startsWith('$'));
        if (hasOperator) {
          return res.status(400).json({
            error: 'Invalid input detected'
          });
        }
      }
    });
  }
  next();
};
