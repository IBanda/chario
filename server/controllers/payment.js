import fetch from 'node-fetch';
import getHeaders from '../utils/getHeaders.js';
import getSignature from '../utils/getSignature.js';
import makeHttpRequest from '../utils/makeHttpRequest.js';
import throwIfError from '../utils/throwIfError.js';

export async function makePayment(req, res, next) {
  const { body } = req;
  try {
    const { signature, salt, timestamp } = getSignature(
      '/v1/payments',
      'post',
      body
    );
    const response = await fetch('https://sandboxapi.rapyd.net/v1/payments', {
      method: 'POST',
      headers: {
        ...getHeaders(signature, salt, timestamp),
        idempotency: salt + timestamp,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();

    throwIfError(data);
    res.status(200);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

export async function getPaymentMethods(req, res, next) {
  const { country } = req.params;
  try {
    const data = await makeHttpRequest(
      `/payment_methods/country?country=${country}`,
      'get'
    );
    throwIfError(data);
    res.status(200);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

export async function makePayout(req, res, next) {
  const { body } = req;
  try {
    const data = await makeHttpRequest('/payouts', 'post', body);
    throwIfError(data);
    res.status(200);
    res.json(data);
  } catch (error) {
    next(error);
  }
}
