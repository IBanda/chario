import getHeaders from './getHeaders';
import getSignature from './getSignature';

export default async function makeHttpRequest(path, method, body) {
  const { signature, salt, timestamp } = getSignature(
    '/v1' + path,
    method.toLowerCase(),
    body
  );

  const requestInit = {
    method: method.toUpperCase(),
    headers: getHeaders(signature, salt, timestamp),
    body: JSON.stringify(body),
  };

  if (!body) delete requestInit.body;

  const response = await fetch(
    'https://sandboxapi.rapyd.net/v1' + path,
    requestInit
  );
  const data = await response.json();
  return data;
}
