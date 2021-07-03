import express from 'express';
import {
  createHub,
  createPersonalWallet,
  transferwalletFunds,
  setTransferResponse,
  joinHub,
  inviteHubMembers,
} from '../controllers/hub.js';

const router = express.Router();

router.post('/join', joinHub);
router.post('/wallet/group/create', createHub);
router.post('/wallet/personal/create', createPersonalWallet);
router.post('/account/transfer', transferwalletFunds);
router.post('/account/transfer/response', setTransferResponse);
router.post('/invite', inviteHubMembers);

export default router;
