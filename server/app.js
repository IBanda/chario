import express from 'express';
import logger from 'morgan';
import './db.js';

import hubRouter from './routes/hub.js';
import userRouter from './routes/user.js';
import loanRouter from './routes/loan.js';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/hub', hubRouter);
app.use('/user', userRouter);
app.use('/loan', loanRouter);

export default app;
