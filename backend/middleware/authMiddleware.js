// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

// Middleware to authenticate the user
const auth = (req, res, next) => {
  // Check for the token in both 'x-auth-token' and 'Authorization' headers
  let token = req.header('x-auth-token');

  if (!token) {
    // If 'x-auth-token' is not present, check the 'Authorization' header for 'Bearer <token>'
    const authHeader = req.header('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1]; // Extract token after 'Bearer '
    }
  }

  // If no token is found, deny access
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    // Verify the token using the secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Assuming your token's payload includes the user object
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message); // Log the error for debugging
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Middleware to check if the authenticated user is an admin
const adminAuth = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    // If user is not an admin, deny access
    return res.status(403).json({ msg: 'Access denied: Admins only' });
  }
  next(); // Proceed if the user is an admin
};

module.exports = { auth, adminAuth };
