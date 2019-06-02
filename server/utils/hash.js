const crypto = require('crypto');

const SHA256 = 'sha256';
const DIGEST_TYPE = 'hex';

const sha256 = (str, salt) => {
  let hash = crypto.createHash(SHA256);
  hash.update(str + salt);
  return hash.digest(DIGEST_TYPE);
}

module.exports = sha256;