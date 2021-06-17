import CryptoJS from 'crypto-js';

export default function getSignature(urlPath, httpMethod = 'get', body = '') {
  const salt = CryptoJS.lib.WordArray.random(12);
  const timestamp = (Math.floor(new Date().getTime() / 1000) - 1).toString();
  let stringifiedBody = '';
  if (body) stringifiedBody = JSON.stringify(body);

  const toSign =
    httpMethod +
    urlPath +
    salt +
    timestamp +
    process.env.RAPYD_ACCESS_KEY +
    process.env.RAPYD_SECRET_KEY +
    stringifiedBody;

  let signature = CryptoJS.enc.Hex.stringify(
    CryptoJS.HmacSHA256(toSign, process.env.RAPYD_SECRET_KEY)
  );

  signature = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(signature));

  return { signature, timestamp, salt };
}
