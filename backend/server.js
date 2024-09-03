require('dotenv').config();
const express = require('express');
const initMongoDB = require('./helpers/initMongoDB'); // Correctly initialize MongoDB
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const errorHandler = require('./middleware/errorHandler'); // Enhanced error handler

const app = express();

app.use(express.json());

// Initialize MongoDB
initMongoDB();

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
