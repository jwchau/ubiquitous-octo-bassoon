const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const usersRouter = require('../src/routes/users');
const eventsRouter = require('../src/routes/events');
app.use('/api/users', usersRouter);
app.use('/api/events', eventsRouter);

const { init } = require('../src/db');
init();

describe('events API', () => {
  it('can create an event for a user', async () => {
    const user = await request(app)
      .post('/api/users')
      .send({ name: 'Bob', email: 'bob@example.com' });

    const eventRes = await request(app)
      .post('/api/events')
      .send({ title: 'Party', date: '2025-01-01', userId: user.body.id });

    expect(eventRes.statusCode).toBe(201);
    expect(eventRes.body).toHaveProperty('id');
  });
});
