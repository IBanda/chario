import express from 'express';
import {
  getPaymentMethods,
  makePayment,
  makePayout,
} from '../controllers/payment.js';

const router = express.Router();

router.get('/methods/:country', getPaymentMethods);
router.post('/out', makePayout);
router.post('/in', makePayment);

export default router;
