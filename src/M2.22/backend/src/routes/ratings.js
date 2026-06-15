const express = require('express');
const pool = require('../db');
const requireAuth = require('../authMiddleware');

const router = express.Router();
router.use(requireAuth);

router.get('/', async (req, res) => {
  const [rows] = await pool.execute(
    'SELECT * FROM ratings WHERE user_id = ? ORDER BY rated_at DESC',
    [req.userId]
  );
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { eventId, eventName, stars, note } = req.body;
  if (!eventId || !stars) return res.status(400).json({ error: 'eventId e stars obrigatórios' });
  try {
    await pool.execute(
      'INSERT INTO ratings (user_id, event_id, event_name, stars, note) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE stars = VALUES(stars), note = VALUES(note), rated_at = NOW()',
      [req.userId, eventId, eventName, stars, note || null]
    );
    res.status(201).json({ ok: true });
  } catch {
    res.status(500).json({ error: 'Erro interno' });
  }
});

router.delete('/:eventId', async (req, res) => {
  await pool.execute(
    'DELETE FROM ratings WHERE user_id = ? AND event_id = ?',
    [req.userId, req.params.eventId]
  );
  res.json({ ok: true });
});

module.exports = router;
