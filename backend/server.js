// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes'); // Add event routes if applicable
const dotenv = require('dotenv');
const createError = require('http-errors'); // Import http-errors
const errorHandler = require('./middleware/errorHandler'); // Import custom error handler

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(express.json()); // Parses incoming JSON requests

// Routes
app.use('/api/users', userRoutes); // User-related routes
app.use('/api/auth', authRoutes);  // Authentication-related routes
app.use('/api/events', eventRoutes); // Event-related routes if applicable

// Handle unknown routes
app.use((req, res, next) => {
  next(createError(404, 'Route not found'));
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // Connect to MongoDB with connection string from env file
    console.log('MongoDB connected');
  } catch (err) {
    console.error(`MongoDB connection error: ${err.message}`);
    process.exit(1); // Exit process with failure
  }
};

connectDB(); // Call the function to connect to MongoDB

// Custom error handler middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
