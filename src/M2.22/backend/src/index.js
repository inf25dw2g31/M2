const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/auth');
const favoritesRoutes = require('./routes/favorites');
const historyRoutes = require('./routes/history');
const searchesRoutes = require('./routes/searches');
const ratingsRoutes = require('./routes/ratings');
const listsRoutes = require('./routes/lists');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/auth', rateLimit({ windowMs: 15 * 60 * 1000, max: 20, message: { error: 'Demasiados pedidos. Tenta mais tarde.' } }));
app.use(rateLimit({ windowMs: 60 * 1000, max: 100, message: { error: 'Limite de pedidos atingido.' } }));

app.use('/auth', authRoutes);
app.use('/favorites', favoritesRoutes);
app.use('/history', historyRoutes);
app.use('/searches', searchesRoutes);
app.use('/ratings', ratingsRoutes);
app.use('/lists', listsRoutes);

app.get('/health', (_, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => console.log(`API Festivall na porta ${PORT}`));
