import request from 'supertest';
import app from '../../app';
import mongoose from 'mongoose';
import User from '../../models/user.js';

afterEach(async () => {
  await User.deleteMany();
});
afterAll(async () => {
  await mongoose.disconnect();
});

const user = { email: 'ian@mail.com', password: '123456' };

describe('User Controller', () => {
  test('User signup: SUCCESS', async () => {
    const res = await request(app).post('/user/signup').send(user);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('SUCCESS');
  });

  test('User signup: ERROR', async () => {
    await request(app).post('/user/signup').send(user);
    const res = await request(app).post('/user/signup').send(user);

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Email already exists');
  });

  test('User signin: SUCCESS', async () => {
    await request(app).post('/user/signup').send(user);

    const res = await request(app).post('/user/signin').send(user);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('SUCCESS');
  });

  test('User signin: ERROR - Invalid email', async () => {
    const res = await request(app).post('/user/signin').send(user);

    expect(res.statusCode).toBe(401);
    expect(res.body.status).toBe('ERROR');
    expect(res.body.message).toBe('Invalid email provided');
  });

  test('User signin: ERROR - Invalid password', async () => {
    await request(app).post('/user/signup').send(user);

    const res = await request(app)
      .post('/user/signin')
      .send({ email: 'ian@mail.com', password: 'wrong' });

    expect(res.statusCode).toBe(401);
    expect(res.body.status).toBe('ERROR');
    expect(res.body.message).toBe('Invalid password provided');
  });
});
