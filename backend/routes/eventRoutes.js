// backend/routes/eventRoutes.js
const express = require('express');
const { createEvent, getEvents, updateEvent, deleteEvent, rsvpEvent } = require('../controllers/eventController');
const { auth, adminAuth } = require('../middleware/authMiddleware');
const router = express.Router();

// Routes for both users and admins
router.get('/', auth, getEvents); // Ensure getEvents is correctly imported
router.post('/:id/rsvp', auth, rsvpEvent); // Ensure rsvpEvent is correctly imported

// Admin-only routes
router.post('/', [auth, adminAuth], createEvent); // Ensure createEvent is correctly imported
router.put('/:id', [auth, adminAuth], updateEvent); // Ensure updateEvent is correctly imported
router.delete('/:id', [auth, adminAuth], deleteEvent); // Ensure deleteEvent is correctly imported

module.exports = router;
