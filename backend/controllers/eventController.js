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
    const events = await Event.find()
      .populate('createdBy', 'name')  // Populating the user who created the event
      .populate('attendees', 'name')  // Populating attendees
      .populate('rsvps', 'name');     // Populating RSVP list
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

    // Check if user has already RSVP'd
    if (!event.rsvps.includes(req.user.id)) {
      event.rsvps.push(req.user.id);
      await event.save();
      return res.json({ msg: 'RSVP successful', event });
    }

    res.status(400).json({ msg: 'User has already RSVP\'d to this event' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
