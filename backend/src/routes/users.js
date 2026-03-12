const express = require('express');
const {
  listUsers,
  addUser,
  getUser,
  editUser,
  removeUser,
} = require('../controllers/usersController');

const router = express.Router();

router.get('/', listUsers);
router.post('/', addUser);
router.get('/:id', getUser);
router.put('/:id', editUser);
router.delete('/:id', removeUser);

module.exports = router;
