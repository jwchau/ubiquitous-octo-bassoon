// sqlite-based event model
const { db } = require('../db');

function createEvent({ title, date, userId }) {
  return new Promise((resolve, reject) => {
    const stmt = `INSERT INTO events (title, date, userId) VALUES (?, ?, ?)`;
    db.run(stmt, [title, date, userId], function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, title, date, userId });
    });
  });
}

function getAllEvents() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM events`, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

function getEventById(id) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM events WHERE id = ?`, [id], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

function updateEvent(id, { title, date, userId }) {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE events SET title = ?, date = ?, userId = ? WHERE id = ?`,
      [title, date, userId, id],
      function (err) {
        if (err) return reject(err);
        resolve({ id, title, date, userId });
      }
    );
  });
}

function deleteEvent(id) {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM events WHERE id = ?`, [id], function (err) {
      if (err) return reject(err);
      resolve();
    });
  });
}

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
