const express = require('express');
const pool = require('../db');
const requireAuth = require('../authMiddleware');

const router = express.Router();
router.use(requireAuth);

router.get('/', async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(50, parseInt(req.query.limit) || 20);
  const offset = (page - 1) * limit;

  const [[{ total }]] = await pool.execute(
    'SELECT COUNT(*) as total FROM favorites WHERE user_id = ?', [req.userId]
  );
  const [rows] = await pool.execute(
    `SELECT event_data FROM favorites WHERE user_id = ? ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`,
    [req.userId]
  );
  res.json({ data: rows.map((r) => typeof r.event_data === 'string' ? JSON.parse(r.event_data) : r.event_data), total, page, limit, pages: Math.ceil(total / limit) });
});

router.post('/', async (req, res) => {
  const { event } = req.body;
  if (!event?.id) return res.status(400).json({ error: 'Evento inválido' });
  try {
    await pool.execute(
      'INSERT INTO favorites (user_id, event_id, event_name, event_data) VALUES (?, ?, ?, ?)',
      [req.userId, event.id, event.name, JSON.stringify(event)]
    );
    res.status(201).json({ ok: true });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Já é favorito' });
    res.status(500).json({ error: 'Erro interno' });
  }
});

router.delete('/:eventId', async (req, res) => {
  await pool.execute(
    'DELETE FROM favorites WHERE user_id = ? AND event_id = ?',
    [req.userId, req.params.eventId]
  );
  res.json({ ok: true });
});

module.exports = router;
