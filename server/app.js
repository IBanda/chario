import express from 'express';
import logger from 'morgan';
import session from 'express-session';
import './db.js';

import hubRouter from './routes/hub.js';
import userRouter from './routes/user.js';
import loanRouter from './routes/loan.js';
import auth from './auth/auth.js';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.COOKIE_SESSION,
    saveUninitialized: false,
    resave: false,
  })
);

app.use('/hub', auth, hubRouter);
app.use('/user', userRouter);
app.use('/loan', auth, loanRouter);

export default app;
