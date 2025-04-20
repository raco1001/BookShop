const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

const env = process.env.NODE_ENV || 'production'

const config = {
  development: {
    DB_HOST: process.env.DB_HOST_DEV || 'localhost',
    DB_USER: process.env.DB_USER_DEV || 'root',
    DB_PASS: process.env.DB_PASS_DEV || 'root',
    DB_NAME: process.env.DB_NAME_DEV || 'Bookshop_dev',
    DB_PORT: parseInt(process.env.DB_PORT_DEV, 10) || 3306,
  },
  production: {
    DB_HOST: process.env.DB_HOST_PROD,
    DB_USER: process.env.DB_USER_PROD,
    DB_PASS: process.env.DB_PASS_PROD,
    DB_NAME: process.env.DB_NAME_PROD,
    DB_PORT: parseInt(process.env.DB_PORT_PROD, 10),
  },
  test: {
    DB_HOST: process.env.DB_HOST_TEST || 'localhost',
    DB_USER: process.env.DB_USER_TEST || 'test_user',
    DB_PASS: process.env.DB_PASS_TEST || 'test_pass',
    DB_NAME: process.env.DB_NAME_TEST || 'Bookshop_test',
    DB_PORT: parseInt(process.env.DB_PORT_TEST, 10) || 3306,
  },
}

console.log('Current NODE_ENV:', env)
console.log('Using database config for:', config[env])

module.exports = { ...config[env], NODE_ENV: env }
