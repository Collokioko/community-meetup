const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
    password: {
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
    if (!this.isModified('password')) {
      return next(); // Only hash if the password has been modified or is new
    }
  
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (err) {
      next(err);
    }
  });
  
module.exports = mongoose.model('User', UserSchema);

