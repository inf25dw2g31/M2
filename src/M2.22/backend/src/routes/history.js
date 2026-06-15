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
    'SELECT COUNT(*) as total FROM history WHERE user_id = ?', [req.userId]
  );
  const [rows] = await pool.execute(
    `SELECT event_data, viewed_at FROM history WHERE user_id = ? ORDER BY viewed_at DESC LIMIT ${limit} OFFSET ${offset}`,
    [req.userId]
  );
  res.json({ data: rows.map((r) => {
    const ev = typeof r.event_data === 'string' ? JSON.parse(r.event_data) : r.event_data;
    return { ...ev, viewed_at: r.viewed_at };
  }), total, page, limit, pages: Math.ceil(total / limit) });
});

router.post('/', async (req, res) => {
  const { event } = req.body;
  if (!event?.id) return res.status(400).json({ error: 'Evento inválido' });
  await pool.execute(
    'INSERT INTO history (user_id, event_id, event_name, event_data) VALUES (?, ?, ?, ?)',
    [req.userId, event.id, event.name, JSON.stringify(event)]
  );
  res.status(201).json({ ok: true });
});

module.exports = router;
