import request from 'supertest-session';
import app from '../../../app';
import sendMail from '../../../utils/transporter';
import User from '../../../models/user';

afterEach(async () => {
  await User.deleteMany();
});

jest.mock('../../../utils/transporter');

test('Should invite hub members', async () => {
  const req = request(app);
  await req
    .post('/user/signup')
    .send({ email: 'ian@mail.com', password: '123456' });

  const res = await req
    .post('/hub/invite')
    .send({ emails: ['ian@mail.com', 'test@mail.com'] });

  expect(res.statusCode).toBe(200);
  expect(res.body.status).toBe('SUCCESS');
  expect(sendMail).toHaveBeenCalledTimes(2);
});
