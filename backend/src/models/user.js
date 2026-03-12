// sqlite-based user model
const { db } = require('../db');

function createUser({ name, email }) {
  return new Promise((resolve, reject) => {
    const stmt = `INSERT INTO users (name, email) VALUES (?, ?)`;
    db.run(stmt, [name, email], function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, name, email });
    });
  });
}

function getAllUsers() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM users`, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

function getUserById(id) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

function updateUser(id, { name, email }) {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE users SET name = ?, email = ? WHERE id = ?`,
      [name, email, id],
      function (err) {
        if (err) return reject(err);
        resolve({ id, name, email });
      }
    );
  });
}

function deleteUser(id) {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM users WHERE id = ?`, [id], function (err) {
      if (err) return reject(err);
      resolve();
    });
  });
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
