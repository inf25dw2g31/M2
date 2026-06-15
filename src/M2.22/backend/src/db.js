const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME || 'festivall',
  user: process.env.DB_USER || 'festivall_user',
  password: process.env.DB_PASSWORD || 'festivall1234',
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
