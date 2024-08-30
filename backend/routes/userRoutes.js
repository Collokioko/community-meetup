// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, deleteUser } = require('../controllers/userController');
const { auth, adminAuth } = require('../middleware/authMiddleware'); // Ensure 'adminAuth' is imported if used

// Get user profile
router.get('/profile', auth, getUserProfile);

// Update user profile
router.put('/profile', auth, updateUserProfile);

// Delete user profile
router.delete('/profile', auth, adminAuth, deleteUser); // Use 'adminAuth' for admin-only access

module.exports = router;
