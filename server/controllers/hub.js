/* eslint-disable no-use-before-define */
import fetch from 'node-fetch';
import getHeaders from '../utils/getHeaders.js';
import getSignature from '../utils/getSignature.js';
import Hub from '../models/hub.js';
import Wallet from '../models/wallet.js';
import sendMail from '../utils/transporter.js';

const baseURL = 'https://sandboxapi.rapyd.net/v1';

export async function createHub(req, res, next) {
  const { interestRate, ...body } = req.body;
  try {
    const wallet = await createWallet(body);
    await Hub.create({ wallet: wallet.data.id, interest_rate: interestRate });
    res.status(201);
    res.json(wallet);
  } catch (error) {
    next(error);
  }
}

export async function createPersonalWallet(req, res, next) {
  const { body } = req;
  try {
    const wallet = await createWallet(body);
    await Wallet.create({
      owner: req.session.user,
      wallet_id: wallet.data.id,
    });
    res.status(201);
    res.json(wallet);
  } catch (error) {
    next(error);
  }
}

/*
 * TODO: use the collect api
 */
export async function addWalletFunds(req, res, next) {
  const { body } = req;
  try {
    const { signature, salt, timestamp } = getSignature(
      '/v1/account/deposit',
      'post',
      body
    );
    const response = await fetch(baseURL + '/account/deposit', {
      method: 'POST',
      headers: getHeaders(signature, salt, timestamp),
      body: JSON.stringify(body),
    });
    const data = await response.json();
    res.status(200);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

export async function transferwalletFunds(req, res, next) {
  const { body } = req;
  try {
    const { signature, salt, timestamp } = getSignature(
      '/v1/account/transfer',
      'post',
      body
    );
    const response = await fetch(baseURL + '/account/transfer', {
      method: 'POST',
      headers: getHeaders(signature, salt, timestamp),
      body: JSON.stringify(body),
    });
    const data = await response.json();
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
    const { signature, salt, timestamp } = getSignature(
      '/v1/account/transfer/response',
      'post',
      body
    );
    const response = await fetch(baseURL + '/account/transfer/response', {
      method: 'POST',
      headers: getHeaders(signature, salt, timestamp),
      body: JSON.stringify(body),
    });
    const data = await response.json();
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
      $addToSet: { members: req.session.user },
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

async function createWallet(body) {
  const { signature, salt, timestamp } = getSignature('/v1/user', 'post', body);
  const response = await fetch(baseURL + '/user', {
    method: 'POST',
    headers: getHeaders(signature, salt, timestamp),
    body: JSON.stringify(body),
  });
  const wallet = await response.json();
  return wallet;
}
