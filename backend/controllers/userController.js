const User = require('../models/User');
const bcrypt = require('bcryptjs');
const createError = require('http-errors');

// Get user profile
exports.getUserProfile = async (req, res, next) => {
  try {
    // Log the user object to verify ID
    console.log('Fetching profile for user:', req.user);

    // Find the user by their ID and exclude the password from the response
    const user = await User.findById(req.user.id).select('-password');

    // Log the result of the find operation
    if (!user) {
      console.error(`User not found with ID: ${req.user.id}`);
      return next(createError(404, 'User not found'));
    }

    console.log('User profile found:', user);
    res.json(user);
  } catch (err) {
    console.error("Error fetching user profile:", err.stack);
    next(createError(500, 'Server error'));
  }
};

// Update user profile
exports.updateUserProfile = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    console.log('Updating profile for user:', req.user);

    // Find the user by their ID
    let user = await User.findById(req.user.id);

    if (!user) {
      console.error(`User not found with ID: ${req.user.id}`);
      return next(createError(404, 'User not found'));
    }

    // Update fields if provided
    if (name) user.name = name;
    if (email) user.email = email;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    console.log('User profile updated:', user);
    res.json(user);
  } catch (err) {
    console.error("Error updating user profile:", err.stack);
    next(createError(500, 'Server error'));
  }
};

// Delete user profile (for admin or self-delete)
exports.deleteUser = async (req, res, next) => {
  try {
    console.log('Deleting profile for user:', req.user);

    const user = await User.findByIdAndRemove(req.user.id);
    if (!user) {
      console.error(`User not found with ID: ${req.user.id}`);
      return next(createError(404, 'User not found'));
    }

    console.log('User profile deleted:', user);
    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error("Error deleting user profile:", err.stack);
    next(createError(500, 'Server error'));
  }
};
