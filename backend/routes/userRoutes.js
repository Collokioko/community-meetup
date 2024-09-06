// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, deleteUser } = require('../controllers/userController');
const { auth, adminAuth } = require('../middleware/authMiddleware');

// Get user profile - Protected route, requires authentication
router.get('/profile', auth, getUserProfile);

// Update user profile - Protected route, requires authentication
router.put('/profile', auth, updateUserProfile);

// Delete user profile - Protected route, requires both authentication and admin authorization
router.delete('/profile', auth, adminAuth, deleteUser);

module.exports = router;
