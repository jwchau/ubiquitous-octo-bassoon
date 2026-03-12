const express = require('express');
const {
  listEvents,
  addEvent,
  getEvent,
  editEvent,
  removeEvent,
} = require('../controllers/eventsController');

const router = express.Router();

router.get('/', listEvents);
router.post('/', addEvent);
router.get('/:id', getEvent);
router.put('/:id', editEvent);
router.delete('/:id', removeEvent);

module.exports = router;
