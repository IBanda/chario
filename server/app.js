import express from 'express';
import logger from 'morgan';

import walletRouter from './routes/wallet.js';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/wallet', walletRouter);

export default app;
