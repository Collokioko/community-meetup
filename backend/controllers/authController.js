// controllers/authController.js

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const createError = require('http-errors'); // Import http-errors

// Register a new user
exports.register = async (req, res, next) => {
  const { name, email, password, role } = req.body; // Accept role from request
  try {
    let user = await User.findOne({ email });
    if (user) {
      // Throw a 400 error if the user already exists
      return next(createError(400, 'User already exists'));
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({ name, email, password: hashedPassword, role }); // Save hashed password
    await user.save();

    const payload = { user: { id: user.id, role: user.role } }; // Include role in the payload
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        return next(createError(500, 'Error generating token')); // Use http-errors for server errors
      }
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message); // Log error for debugging
    next(createError(500, 'Server error')); // Use http-errors for server errors
  }
};
// Login a user
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    console.log("Login attempt with email:", email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("No user found with email:", email);
      return next(createError(400, 'Invalid credentials'));
    }

    console.log("User found:", user);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password does not match for user:", email);
      return next(createError(400, 'Invalid credentials'));
    }

    console.log("Password match successful for user:", email);

    const payload = { user: { id: user.id, role: user.role } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        console.log("Error generating token for user:", email, "Error:", err);
        return next(createError(500, 'Error generating token'));
      }
      console.log("Token generated successfully for user:", email);
      res.json({ token });
    });
  } catch (err) {
    console.error("Server error during login for user:", email, "Error:", err.message);
    next(createError(500, 'Server error'));
  }
};

