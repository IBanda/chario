import express from 'express';
import {
  createCompanyWallet,
  createPersonalWallet,
  addWalletFunds,
  transferwalletFunds,
  setTransferResponse,
} from '../controllers/wallet.js';

const router = express.Router();

router.post('/company/create', createCompanyWallet);
router.post('/personal/create', createPersonalWallet);
router.post('/account/deposit', addWalletFunds);
router.post('/account/transfer', transferwalletFunds);
router.post('/account/transfer/response', setTransferResponse);

export default router;
