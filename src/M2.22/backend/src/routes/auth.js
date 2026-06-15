const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const requireAuth = require('../authMiddleware');
const { encrypt, decrypt } = require('../crypto');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'festivall_jwt_secret_2024';

function makeToken(userId, username) {
  return jwt.sign({ userId, username }, JWT_SECRET, { expiresIn: '7d' });
}

router.post('/register', async (req, res) => {
  const { username, password, tmApiKey } = req.body;
  if (!username || !password || !tmApiKey) {
    return res.status(400).json({ error: 'Username, password e API Key obrigatórios' });
  }
  try {
    const hash = await bcrypt.hash(password, 10);
    const [result] = await pool.execute(
      'INSERT INTO users (username, password_hash, tm_api_key_enc) VALUES (?, ?, ?)',
      [username, hash, encrypt(tmApiKey.trim())]
    );
    res.status(201).json({ token: makeToken(result.insertId, username), username, tmApiKey: tmApiKey.trim() });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Username já existe' });
    res.status(500).json({ error: 'Erro interno' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username e password obrigatórios' });
  }
  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
    const user = rows[0];
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    const tmApiKey = user.tm_api_key_enc ? decrypt(user.tm_api_key_enc) : '';
    res.json({ token: makeToken(user.id, user.username), username: user.username, tmApiKey });
  } catch {
    res.status(500).json({ error: 'Erro interno' });
  }
});

router.put('/api-key', requireAuth, async (req, res) => {
  const { tmApiKey } = req.body;
  if (!tmApiKey) return res.status(400).json({ error: 'API Key obrigatória' });
  await pool.execute('UPDATE users SET tm_api_key_enc = ? WHERE id = ?', [encrypt(tmApiKey.trim()), req.userId]);
  res.json({ ok: true, tmApiKey: tmApiKey.trim() });
});

module.exports = router;
