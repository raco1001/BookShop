const jwt = require('jsonwebtoken')
const { binaryToUUID } = require('../../shared/utils/convertIds')
const { requestTypes } = require('./entities/returns/auth-entities')
const validateSchema = require('../../shared/middlewares/validateSchema')
const { AuthError } = require('./auth-utils')
const { v4: uuidv4 } = require('uuid')
const authLogger = require('./auth-logger')

const addRequestId = (req, res, next) => {
  req.requestId = uuidv4()
  next()
}

const validateJoin = () => {
  return validateSchema(requestTypes.join)
}

const validateLogin = () => {
  return validateSchema(requestTypes.login)
}

const validateRefresh = () => {
  return validateSchema(requestTypes.refresh)
}

const validateAccessToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Access Token is required',
        requestId: req.requestId,
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.id
    console.log('validateAccessToken', req.userId)
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      authLogger.logTokenValidationError(
        'unknown',
        req.requestId,
        'Token has expired',
      )
      return res.status(401).json({
        status: 'error',
        message: 'Access Token has expired. Please login again.',
        requestId: req.requestId,
      })
    }
    if (error.name === 'JsonWebTokenError') {
      authLogger.logTokenValidationError(
        'unknown',
        req.requestId,
        'Invalid token',
      )
      return res.status(403).json({
        status: 'error',
        message: 'Invalid Access Token',
        requestId: req.requestId,
      })
    }
    authLogger.logTokenValidationError(
      'unknown',
      req.requestId,
      'Server error during token validation',
    )
    return res.status(500).json({
      status: 'error',
      message: 'Server error during token validation',
      requestId: req.requestId,
    })
  }
}

const validateRefreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
      return res.status(401).json({
        status: 'error',
        message: 'Refresh Token is required. Please login again.',
        requestId: req.requestId,
      })
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
    if (decoded.expiresIn <= Date.now()) {
      return res.status(401).json({
        status: 'error',
        message: 'Refresh Token has expired. Please login again.',
        requestId: req.requestId,
      })
    }
    req.userId = decoded.id
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      authLogger.logTokenValidationError(
        'unknown',
        req.requestId,
        'Refresh token has expired',
      )
      return res.status(401).json({
        status: 'error',
        message: 'Refresh Token has expired. Please login again.',
        requestId: req.requestId,
      })
    }
    authLogger.logTokenValidationError(
      'unknown',
      req.requestId,
      'Invalid refresh token',
    )
    return res.status(403).json({
      status: 'error',
      message: 'Invalid Refresh Token. Please login again.',
      requestId: req.requestId,
    })
  }
}

const handleAuthError = (err, req, res, next) => {
  console.error(`Auth Error [${req.requestId}]:`, err)

  if (err instanceof AuthError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      requestId: req.requestId,
    })
  }

  return res.status(500).json({
    status: 'error',
    message: 'An unexpected error occurred',
    requestId: req.requestId,
  })
}

module.exports = {
  validateAccessToken,
  validateRefreshToken,
  validateJoin,
  validateLogin,
  validateRefresh,
  addRequestId,
  handleAuthError,
}
