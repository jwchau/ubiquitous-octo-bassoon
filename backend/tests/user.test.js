const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

// create a small app instance with routes for testing
const app = express();
app.use(bodyParser.json());

const usersRouter = require('../src/routes/users');
app.use('/api/users', usersRouter);

// ensure db initialized
const { init } = require('../src/db');
init();

describe('users API', () => {
  it('can create then fetch a user', async () => {
    const postRes = await request(app)
      .post('/api/users')
      .send({ name: 'Alice', email: 'alice@example.com' });
    expect(postRes.statusCode).toBe(201);
    expect(postRes.body).toHaveProperty('id');
    const id = postRes.body.id;

    const getRes = await request(app).get(`/api/users/${id}`);
    expect(getRes.statusCode).toBe(200);
    expect(getRes.body.name).toBe('Alice');
  });
});
