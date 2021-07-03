import request from 'supertest-session';
import Wallet from '../../../models/wallet';
import User from '../../../models/user';
import app from '../../../app';

afterEach(async () => {
  await Wallet.deleteMany();
  await User.deleteMany();
});

test('Hub Controller: Create Personal Wallet', async () => {
  let req = request(app);
  await req
    .post('/user/signup')
    .send({ email: 'ian@mail.com', password: '123456' });

  const res = await req.post('/hub/wallet/personal/create').send({
    first_name: 'John',
    last_name: 'Doe',
    email: '',
    ewallet_reference_id: 'John-Doe-02152020',
    phone_number: '',
    type: 'person',
    contact: {
      phone_number: '+14155551311',
      email: 'johndoe@rapyd.net',
      first_name: 'John',
      last_name: 'Doe',
      mothers_name: 'Jane Smith',
      contact_type: 'personal',
      address: {
        name: 'John Doe',
        line_1: '123 Main Street',
        city: 'Anytown',
        state: 'NY',
        country: 'US',
        zip: '12345',
        phone_number: '+14155551111',
        metadata: {},
        canton: '',
        district: '',
      },
      date_of_birth: '11/22/2000',
      country: 'US',
      nationality: 'FR',
    },
  });

  expect(res.statusCode).toBe(201);
  expect(res.body.status.status).toBe('SUCCESS');
});
