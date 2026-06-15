const crypto = require('crypto');

const ALGORITHM = 'aes-256-cbc';
const KEY = crypto.scryptSync(process.env.ENCRYPTION_SECRET || 'festivall_enc_secret_2024', 'salt', 32);

function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(stored) {
  const [ivHex, encHex] = stored.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
  const decrypted = Buffer.concat([decipher.update(Buffer.from(encHex, 'hex')), decipher.final()]);
  return decrypted.toString('utf8');
}

module.exports = { encrypt, decrypt };
