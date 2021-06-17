import express from 'express';
import {
  createCompanyWallet,
  createPersonalWallet,
  addWalletFunds,
} from '../controllers/wallet.js';

const router = express.Router();

router.post('/company/create', createCompanyWallet);
router.post('/personal/create', createPersonalWallet);
router.post('/account/deposit', addWalletFunds);

export default router;
