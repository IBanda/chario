import express from 'express';
import { loanAction, requestLoan } from '../controllers/loan.js';

const router = express.Router();

router.post('/request', requestLoan);
router.post('/act', loanAction);

export default router;
