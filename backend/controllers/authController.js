const User = require('../models/User');
const createError = require('http-errors');
const { authSchema, loginSchema } = require('../helpers/validationSchema');
const { signAccessToken, signRefreshToken } = require('../helpers/jwtHelper');

// Register a new user
module.exports = {
  register: async (req, res, next) => {
    try {
      // Validate request body
      const result = await authSchema.validateAsync(req.body);

      const { name, email, password, role } = result;

      // Check if user already exists
      const exists = await User.findOne({ email });
      if (exists) throw createError.Conflict(`${email} has already been registered`);

      // Create and save the new user
      const user = new User({ name, email, password, role });
      const savedUser = await user.save();

      // Generate access and refresh tokens
      const accessToken = await signAccessToken(savedUser.id);
      const refreshToken = await signRefreshToken(savedUser.id);

      res.send({ accessToken, refreshToken });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      // Validate request body
      const result = await loginSchema.validateAsync(req.body);

      const { email, password } = result;

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) throw createError.NotFound('User not registered');

      // Validate password
      const isMatch = await user.isValidPassword(password);
      if (!isMatch) throw createError.Unauthorized('Invalid username/password');

      // Generate access and refresh tokens
      const accessToken = await signAccessToken(user.id);
      const refreshToken = await signRefreshToken(user.id);

      res.send({ accessToken, refreshToken });
    } catch (error) {
      if (error.isJoi === true) return next(createError.BadRequest('Invalid input data'));
      next(error);
    }
  }
};
