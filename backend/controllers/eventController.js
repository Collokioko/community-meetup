// backend/controllers/eventController.js
const Event = require('../models/Event');

// Create an event
exports.createEvent = async (req, res) => {
  const { title, description, date } = req.body;
  try {
    const event = new Event({ title, description, date, createdBy: req.user.id });
    await event.save();
    res.json(event);
  } catch (err) {
    console.error(err.message); // Log error for debugging
    res.status(500).send('Server error');
  }
};

// Get events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error(err.message); // Log error for debugging
    res.status(500).send('Server error');
  }
};

// Update an event
exports.updateEvent = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    let event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ msg: 'Event not found' });

    // Only update fields that are provided
    if (title) event.title = title;
    if (description) event.description = description;
    if (date) event.date = date;

    event = await event.save();
    res.json(event);
  } catch (err) {
    console.error(err.message); // Log error for debugging
    res.status(500).send('Server error');
  }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ msg: 'Event not found' });

    await event.remove();
    res.json({ msg: 'Event deleted' });
  } catch (err) {
    console.error(err.message); // Log error for debugging
    res.status(500).send('Server error');
  }
};

// RSVP to an event
exports.rsvpEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ msg: 'Event not found' });

    // Assume `rsvps` is a field in the Event model where user IDs are stored
    if (!event.rsvps.includes(req.user.id)) {
      event.rsvps.push(req.user.id);
      await event.save();
    }

    res.json(event);
  } catch (err) {
    console.error(err.message); // Log error for debugging
    res.status(500).send('Server error');
  }
};
