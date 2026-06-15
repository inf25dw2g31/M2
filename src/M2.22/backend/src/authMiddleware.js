const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token em falta' });
  }
  try {
    const payload = jwt.verify(header.slice(7), process.env.JWT_SECRET || 'festivall_jwt_secret_2024');
    req.userId = payload.userId;
    req.username = payload.username;
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
}

module.exports = requireAuth;
