// backend/controllers/userController.js
const User = require('../models/User');
const argon2 = require('argon2');
const createError = require('http-errors'); // Import http-errors

// Get user profile
exports.getUserProfile = async (req, res, next) => {
  try {
    // Find the user by their ID and exclude the password from the response
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      // Throw a 404 error if the user is not found
      return next(createError(404, 'User not found'));
    }

    // Return the user profile
    res.json(user);
  } catch (err) {
    console.error("Error fetching user profile:", err.message);
    // Use createError for server errors
    next(createError(500, 'Server error'));
  }
};

// Update user profile
exports.updateUserProfile = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    // Find the user by their ID
    let user = await User.findById(req.user.id);

    if (!user) {
      // Throw a 404 error if the user is not found
      return next(createError(404, 'User not found'));
    }

    // Update fields if provided
    if (name) user.name = name;
    if (email) user.email = email;

    if (password) {
      // Hash the new password using Argon2 before saving
      user.password = await argon2.hash(password);
    }

    // Save the updated user profile
    await user.save();
    // Return the updated user profile
    res.json(user);
  } catch (err) {
    console.error("Error updating user profile:", err.message);
    // Use createError for server errors
    next(createError(500, 'Server error'));
  }
};

// Delete user profile (for admin or self-delete)
exports.deleteUser = async (req, res, next) => {
  try {
    // Find the user by their ID and remove them from the database
    const user = await User.findByIdAndRemove(req.user.id);
    if (!user) {
      // Throw a 404 error if the user is not found
      return next(createError(404, 'User not found'));
    }

    // Return a success message after deletion
    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error("Error deleting user profile:", err.message);
    // Use createError for server errors
    next(createError(500, 'Server error'));
  }
};
