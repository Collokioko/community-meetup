// helpers/initMongoDB.js
const mongoose = require('mongoose');

const initMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // No need for useNewUrlParser and useUnifiedTopology
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = initMongoDB;
