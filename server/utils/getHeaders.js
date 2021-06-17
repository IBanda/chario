export default function getHeaders(signature, salt, timestamp) {
  return {
    access_key: process.env.RAPYD_ACCESS_KEY,
    'content-Type': 'application/json',
    signature,
    salt,
    timestamp,
  };
}
