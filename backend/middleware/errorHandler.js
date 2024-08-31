// backend/middleware/errorHandler.js
const createError = require('http-errors');

const errorHandler = (err, req, res, next) => {
  // Log the error for debugging
  console.error(err.stack);

  // Create a friendly error message based on the type of error
  if (err instanceof createError.HttpError) {
    res.status(err.status || 500).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = errorHandler;
