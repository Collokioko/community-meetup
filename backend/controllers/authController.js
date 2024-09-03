// controllers/authController.js

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const { loginSchema, registerSchema } = require('../helpers/validationSchema');

// Register a new user
exports.register = async (req, res, next) => {
  try {
    // Validate request data
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return next(createError(400, error.details[0].message));
    }

    const { name, email, password, role } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return next(createError(400, 'User already exists'));
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    const payload = { user: { id: user.id, role: user.role } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) return next(createError(500, 'Error generating token'));
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    next(createError(500, 'Server error'));
  }
};

// Login a user
exports.login = async (req, res, next) => {
  try {
    // Validate request data
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return next(createError(400, error.details[0].message));
    }

    const { email, password } = req.body;
    console.log("Login attempt with email:", email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("No user found with email:", email);
      return next(createError(400, 'Invalid credentials'));
    }

    console.log("User found:", user);

    // Check if the entered password matches the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password does not match for user:", email);
      return next(createError(400, 'Invalid credentials'));
    }

    console.log("Password match successful for user:", email);

    const payload = { user: { id: user.id, role: user.role } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) return next(createError(500, 'Error generating token'));
      res.json({ token });
    });
  } catch (err) {
    console.error("Server error during login:", err);
    next(createError(500, 'Server error'));
  }
};
