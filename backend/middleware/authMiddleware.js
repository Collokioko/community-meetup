const jwt = require('jsonwebtoken');
const createError = require('http-errors');

// Middleware to authenticate the user
const auth = (req, res, next) => {
  let token = req.header('x-auth-token') || req.header('Authorization')?.split(' ')[1];

  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded.user; // Ensure req.user has { id: userId }
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message); // Log the error for debugging
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Middleware to check if the authenticated user is an admin
const adminAuth = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Access denied: Admins only' });
  }
  next(); // Proceed if the user is an admin
};

module.exports = { auth, adminAuth };
