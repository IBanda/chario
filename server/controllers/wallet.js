/* eslint-disable no-use-before-define */
import fetch from 'node-fetch';
import getHeaders from '../utils/getHeaders.js';
import getSignature from '../utils/getSignature.js';

const baseURL = 'https://sandboxapi.rapyd.net/v1';

export async function createCompanyWallet(req, res, next) {
  const { body } = req;

  try {
    const wallet = createWallet(body);
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
    res.status(201);
    res.json(wallet);
  } catch (error) {
    next(error);
  }
}

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
    });

    res.status(200);
    res.json(response);
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
    });
    res.status(200);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

async function createWallet(body) {
  const { signature, salt, timestamp } = getSignature('/v1/user', 'post', body);
  const wallet = await fetch(baseURL + '/user', {
    method: 'POST',
    headers: getHeaders(signature, salt, timestamp),
  });

  return wallet;
}
