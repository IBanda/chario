import dotenv from 'dotenv';
import { server } from './mocks/server.js';

dotenv.config();

process.env.MONGODB_URI = 'mongodb://localhost:27017/charioTestDB';

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
