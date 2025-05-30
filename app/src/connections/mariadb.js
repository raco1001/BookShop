const mysql = require('mysql2/promise')
const config = require('../config/env')

const pool = mysql.createPool({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASS,
  database: config.DB_NAME,
  port: config.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

module.exports = pool
