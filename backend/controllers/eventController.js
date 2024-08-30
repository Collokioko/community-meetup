const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  const { title, description, date } = req.body;
  try {
    const event = new Event({ title, description, date, createdBy: req.user.id });
    await event.save();
    res.json(event);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Other CRUD functions here...
