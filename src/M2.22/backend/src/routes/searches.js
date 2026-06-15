const express = require('express');
const pool = require('../db');
const requireAuth = require('../authMiddleware');

const router = express.Router();
router.use(requireAuth);

router.get('/', async (req, res) => {
  const [rows] = await pool.execute(
    'SELECT id, label, filters, created_at FROM saved_searches WHERE user_id = ? ORDER BY created_at DESC',
    [req.userId]
  );
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { label, filters } = req.body;
  if (!label || !filters) return res.status(400).json({ error: 'Label e filtros obrigatórios' });
  const [result] = await pool.execute(
    'INSERT INTO saved_searches (user_id, label, filters) VALUES (?, ?, ?)',
    [req.userId, label, JSON.stringify(filters)]
  );
  res.status(201).json({ id: result.insertId, label, filters });
});

router.delete('/:id', async (req, res) => {
  await pool.execute(
    'DELETE FROM saved_searches WHERE id = ? AND user_id = ?',
    [req.params.id, req.userId]
  );
  res.json({ ok: true });
});

module.exports = router;
