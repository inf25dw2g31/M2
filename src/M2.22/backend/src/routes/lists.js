const express = require('express');
const pool = require('../db');
const requireAuth = require('../authMiddleware');

const router = express.Router();
router.use(requireAuth);

router.get('/', async (req, res) => {
  const [lists] = await pool.execute(
    'SELECT id, name, created_at FROM lists WHERE user_id = ? ORDER BY created_at DESC',
    [req.userId]
  );
  res.json(lists);
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Nome obrigatório' });
  const [result] = await pool.execute(
    'INSERT INTO lists (user_id, name) VALUES (?, ?)',
    [req.userId, name]
  );
  res.status(201).json({ id: result.insertId, name });
});

router.delete('/:id', async (req, res) => {
  await pool.execute('DELETE FROM lists WHERE id = ? AND user_id = ?', [req.params.id, req.userId]);
  res.json({ ok: true });
});

router.get('/:id/events', async (req, res) => {
  const [rows] = await pool.execute(
    'SELECT event_data, added_at FROM list_events WHERE list_id = ? ORDER BY added_at DESC',
    [req.params.id]
  );
  res.json(rows.map((r) => {
    const ev = typeof r.event_data === 'string' ? JSON.parse(r.event_data) : r.event_data;
    return { ...ev, added_at: r.added_at };
  }));
});

router.post('/:id/events', async (req, res) => {
  const { event } = req.body;
  if (!event?.id) return res.status(400).json({ error: 'Evento inválido' });
  try {
    await pool.execute(
      'INSERT INTO list_events (list_id, event_id, event_name, event_data) VALUES (?, ?, ?, ?)',
      [req.params.id, event.id, event.name, JSON.stringify(event)]
    );
    res.status(201).json({ ok: true });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Evento já está na lista' });
    res.status(500).json({ error: 'Erro interno' });
  }
});

router.delete('/:id/events/:eventId', async (req, res) => {
  await pool.execute(
    'DELETE FROM list_events WHERE list_id = ? AND event_id = ?',
    [req.params.id, req.params.eventId]
  );
  res.json({ ok: true });
});

module.exports = router;
