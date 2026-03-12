const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../models/user');

async function listUsers(req, res) {
  const users = await getAllUsers();
  res.json(users);
}

async function addUser(req, res) {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  try {
    const user = await createUser({ name, email });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getUser(req, res) {
  const { id } = req.params;
  const user = await getUserById(id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
}

async function editUser(req, res) {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const updated = await updateUser(id, { name, email });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function removeUser(req, res) {
  const { id } = req.params;
  try {
    await deleteUser(id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  listUsers,
  addUser,
  getUser,
  editUser,
  removeUser,
};
