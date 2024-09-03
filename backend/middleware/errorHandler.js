// backend/middleware/errorHandler.js
const createError = require('http-errors');

// Enhanced error handler middleware
const errorHandler = (err, req, res, next) => {
  // Log the complete error stack for debugging
  console.error('Error Stack:', err.stack);
  
  // Check if the error is an instance of HttpError (from http-errors)
  if (err instanceof createError.HttpError) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
      type: err.name,  // e.g., BadRequest, Unauthorized, etc.
      details: err.details || null,  // For additional error context
    });
  }

  // Handle validation errors from Joi
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 400,
      message: 'Validation Error',
      details: err.details.map(detail => detail.message) // Extract Joi error messages
    });
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError' && err.errors) {
    return res.status(400).json({
      status: 400,
      message: 'Mongoose Validation Error',
      details: Object.values(err.errors).map(error => error.message) // Collect all error messages
    });
  }

  // Handle duplicate key errors from MongoDB (e.g., unique fields)
  if (err.code && err.code === 11000) {
    const field = Object.keys(err.keyValue).join(', ');
    return res.status(409).json({
      status: 409,
      message: `Duplicate key error: ${field} already exists.`,
    });
  }

  // Generic handling for unexpected errors
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || 'Internal Server Error',
    type: err.name || 'Error',
  });
};

module.exports = errorHandler;
