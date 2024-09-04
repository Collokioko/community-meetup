const mongoose = require('mongoose');
const argon2 = require('argon2');

// Define the User schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // Only 'user' and 'admin' roles are allowed
    default: 'user', // Default role is 'user'
  },
});

// Mongoose middleware to hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) {
    return next(); // Only hash if the password has been modified or is new
  }

  try {
    // Automatically generate salt and hash password using argon2
    this.passwordHash = await argon2.hash(this.passwordHash);
    next();
  } catch (err) {
    next(err);
  }
});

// Instance method to verify a password
UserSchema.methods.verifyPassword = async function (password) {
  try {
    return await argon2.verify(this.passwordHash, password); // Verify password using argon2
  } catch (err) {
    throw new Error('Error verifying password');
  }
};

module.exports = mongoose.model('User', UserSchema);
