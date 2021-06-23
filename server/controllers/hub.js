/* eslint-disable no-use-before-define */
import fetch from 'node-fetch';
import getHeaders from '../utils/getHeaders.js';
import getSignature from '../utils/getSignature.js';
import Hub from '../models/hub.js';

const baseURL = 'https://sandboxapi.rapyd.net/v1';

export async function createCompanyWallet(req, res, next) {
  const { body } = req;
  try {
    const wallet = await createWallet(body);
    await Hub.create({ wallet: wallet.data.id });

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
