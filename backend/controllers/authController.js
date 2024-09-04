const User = require('../models/User');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const createError = require('http-errors');

// Register a new user
exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;  // Accept name, email, and password
  try {
    // Hash the password using Argon2
    const hashedPassword = await argon2.hash(password);

    // Create a new user document with name, email, and hashed password
    const user = new User({
      name,                // Store the name
      email,
      passwordHash: hashedPassword,  // Store the hashed password
    });

    // Save the user document
    await user.save();

    // Return a success response
    res.json({ message: 'User created successfully' });
  } catch (err) {
    console.error("Error during registration:", err.message);
    next(createError(500, 'Server error'));
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return next(createError(401, 'User not found'));
    }

    // Compare the provided password with the stored password hash
    const isMatch = await argon2.verify(user.passwordHash, password);

    // If the password doesn't match, return invalid credentials
    if (!isMatch) {
      return next(createError(401, 'Invalid credentials'));
    }

    // If the password is valid, generate a JWT token
    const payload = { user: { id: user.id, role: user.role } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        return next(createError(500, 'Error generating token'));
      }
      res.json({ token });
    });
  } catch (err) {
    console.error("Error during login:", err.message);
    next(createError(500, 'Server error'));
  }
};

