import Hub from '../models/hub.js';
import Wallet from '../models/wallet.js';
import sendMail from '../utils/transporter.js';
import throwIfError from '../utils/throwIfError.js';
import makeHttpRequest from '../utils/makeHttpRequest.js';

export async function createHub(req, res, next) {
  const { name, interestRate, minDeposit, maxDeposit, ...body } = req.body;
  try {
    const wallet = await makeHttpRequest('/user', 'post', body);
    throwIfError(wallet);
    await Hub.create({
      wallet: wallet.data.id,
      name,
      min_deposit: minDeposit,
      max_desposit: maxDeposit,
      interest_rate: interestRate,
    });
    res.status(201);
    res.json(wallet);
  } catch (error) {
    next(error);
  }
}

export async function createPersonalWallet(req, res, next) {
  const { body } = req;
  try {
    const wallet = await makeHttpRequest('/user', 'post', body);
    throwIfError(wallet);
    await Wallet.create({
      owner: req.session.user.id,
      wallet_id: wallet.data.id,
    });
    res.status(201);
    res.json(wallet);
  } catch (error) {
    next(error);
  }
}

export async function transferwalletFunds(req, res, next) {
  const { body } = req;
  try {
    const data = await makeHttpRequest('/account/transfer', 'post', body);
    throwIfError(data);
    res.status(200);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

/*
TODO: user should not approve or decline their own transfer, 
only cancel
*/

export async function setTransferResponse(req, res, next) {
  const { body } = req;
  try {
    const data = await makeHttpRequest(
      '/account/transfer/response',
      'post',
      body
    );
    throwIfError(data);
    res.status(200);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

export async function joinHub(req, res, next) {
  const { hub } = req.body;
  try {
    await Hub.findByIdAndUpdate(hub, {
      $addToSet: { members: req.session.user.id },
    });
    res.status(200);
    res.json({
      status: 'SUCCESS',
      message: 'Successfully joined the hub',
    });
  } catch (error) {
    next(error);
  }
}

export async function inviteHubMembers(req, res, next) {
  const { emails } = req.body;
  try {
    const emailsToSend = emails.map((email) =>
      sendMail({
        to: email,
        subject: `You've been invited to join a chario hub`,
        text: 'Click the link to join the hub',
        html: `<a>Join the hub</a>`,
      })
    );
    // eslint-disable-next-line no-undef
    await Promise.all(emailsToSend);
    res.status(200);
    res.json({
      status: 'SUCCESS',
      message: 'Invitations successfully sent',
    });
  } catch (error) {
    next(error);
  }
}
