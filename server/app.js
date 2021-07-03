import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import session from 'express-session';
import cors from 'cors';
import './db.js';

import hubRouter from './routes/hub.js';
import userRouter from './routes/user.js';
import loanRouter from './routes/loan.js';
import paymentRouter from './routes/payment.js';
import auth from './auth/auth.js';

const app = express();

app.use(cors());
app.use(compression());
app.use(helmet());
app.use(morgan('combined'));
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
app.use('/payment', paymentRouter);

export default app;
