const express = require('express');
const { createEvent, getEvents, updateEvent, deleteEvent, rsvpEvent } = require('../controllers/eventController');
const { auth, adminAuth } = require('../middleware/authMiddleware');
const router = express.Router();

// Routes for both users and admins
router.get('/', auth, getEvents);
router.post('/:id/rsvp', auth, rsvpEvent);

// Admin-only routes
router.post('/', [auth, adminAuth], createEvent);
router.put('/:id', [auth, adminAuth], updateEvent);
router.delete('/:id', [auth, adminAuth], deleteEvent);

module.exports = router;
