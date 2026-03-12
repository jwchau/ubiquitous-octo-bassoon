const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require('../models/event');

async function listEvents(req, res) {
  const events = await getAllEvents();
  res.json(events);
}

async function addEvent(req, res) {
  const { title, date, userId } = req.body;
  if (!title || !date || !userId) {
    return res.status(400).json({ error: 'Title, date, and userId are required' });
  }
  try {
    const event = await createEvent({ title, date, userId });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getEvent(req, res) {
  const { id } = req.params;
  const ev = await getEventById(id);
  if (!ev) return res.status(404).json({ error: 'Event not found' });
  res.json(ev);
}

async function editEvent(req, res) {
  const { id } = req.params;
  const { title, date, userId } = req.body;
  try {
    const updated = await updateEvent(id, { title, date, userId });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function removeEvent(req, res) {
  const { id } = req.params;
  try {
    await deleteEvent(id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  listEvents,
  addEvent,
  getEvent,
  editEvent,
  removeEvent,
};
