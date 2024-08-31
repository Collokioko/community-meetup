// backend/controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const createError = require('http-errors'); // Import http-errors

// Get user profile
exports.getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Exclude password from the response
    if (!user) return next(createError(404, 'User not found')); // Use createError for 404

    res.json(user);
  } catch (err) {
    next(createError(500, 'Server error')); // Use createError for 500
  }
};

// Update user profile
exports.updateUserProfile = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findById(req.user.id);

    if (!user) return next(createError(404, 'User not found')); // Use createError for 404

    // Update fields if provided
    if (name) user.name = name;
    if (email) user.email = email;

    if (password) {
      // Hash the new password before saving
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.json(user);
  } catch (err) {
    next(createError(500, 'Server error')); // Use createError for 500
  }
};

// Delete user profile (for admin or self-delete)
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndRemove(req.user.id);
    if (!user) return next(createError(404, 'User not found')); // Use createError for 404

    res.json({ msg: 'User deleted' });
  } catch (err) {
    next(createError(500, 'Server error')); // Use createError for 500
  }
};
