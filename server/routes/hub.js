import express from 'express';
import {
  createHubWallet,
  createPersonalWallet,
  addWalletFunds,
  transferwalletFunds,
  setTransferResponse,
  joinHub,
} from '../controllers/hub.js';

const router = express.Router();

router.post('/join', joinHub);
router.post('/wallet/group/create', createHubWallet);
router.post('/wallet/personal/create', createPersonalWallet);
router.post('/account/deposit', addWalletFunds);
router.post('/account/transfer', transferwalletFunds);
router.post('/account/transfer/response', setTransferResponse);

export default router;
