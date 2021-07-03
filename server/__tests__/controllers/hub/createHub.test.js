import request from 'supertest-session';
import app from '../../../app';
import Hub from '../../../models/hub';
import User from '../../../models/user';

afterEach(async () => {
  await User.deleteMany();
  await Hub.deleteMany();
});

test('HUb Controller: Create hub', async () => {
  let req = request(app);
  await req
    .post('/user/signup')
    .send({ email: 'ian@mail.com', password: '123456' });

  const res = await req.post('/hub/wallet/group/create').send({
    first_name: 'Henry Company',
    ewallet_reference_id: 'test_reference_id',
    type: 'company',
    contact: {
      phone_number: '+14155588799',
      email: 'sanboxtest@rapyd.net',
      first_name: 'Mary',
      last_name: 'Chen',
      contact_type: 'business',
      address: {
        name: 'Henry Company',
        line_1: '888 Some Street',
        city: 'Anytown',
        state: 'NY',
        country: 'US',
        zip: '12345',
        phone_number: '+14155588799',
      },
      business_details: {
        entity_type: 'company',
        name: 'Henry Company',
        registration_number: '4234567779',
        industry_category: 'company',
        industry_sub_category: 'home services',
        address: {
          name: 'Henry Company',
          line_1: '888 Some Street',
          line_2: 'Suite 1200',
          city: 'Anytown',
          state: 'NY',
          country: 'US',
          nationality: 'IT',
          zip: '10101',
          phone_number: '+14155588799',
        },
      },
    },
    name: 'testHub',
    interestRate: 5,
    minDeposit: 300,
    maxDeposit: 500,
  });

  expect(res.body.status.status).toBe('SUCCESS');
});
