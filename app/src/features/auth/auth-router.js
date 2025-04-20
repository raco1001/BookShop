const express = require('express')
const router = express.Router()
const {
  validateAccessToken,
  validateRefreshToken,
  addRequestId,
} = require('./auth-middleware')
const {
  login,
  createAccessToken,
  logout,
  handleAuthError,
} = require('./auth-controller')
const { loginLimiter, refreshLimiter } = require('./auth-utils')

router.use(addRequestId)

router.post('/login', loginLimiter, login)
router.post('/refresh', refreshLimiter, validateRefreshToken, createAccessToken)
router.post('/logout', validateAccessToken, logout)

router.use(handleAuthError)

module.exports = router
