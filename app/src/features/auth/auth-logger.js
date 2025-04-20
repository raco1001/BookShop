const winston = require('winston')
const { format } = winston

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  defaultMeta: { service: 'auth-service' },
  transports: [
    new winston.transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`,
        ),
      ),
    }),
    new winston.transports.File({
      filename: 'logs/auth-error.log',
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    new winston.transports.File({
      filename: 'logs/auth-combined.log',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ],
})

const authLogger = {
  /**
   * Log a successful login
   * @param {string} userId - The user ID
   * @param {string} email - The user email
   * @param {string} requestId - The request ID
   */
  logLogin: (userId, email, requestId) => {
    logger.info('User logged in successfully', {
      userId,
      email,
      requestId,
      event: 'login_success',
    })
  },

  /**
   * Log a failed login attempt
   * @param {string} email - The email that failed to login
   * @param {string} requestId - The request ID
   * @param {string} reason - The reason for failure
   */
  logLoginFailure: (email, requestId, reason) => {
    logger.warn('Login attempt failed', {
      email,
      requestId,
      reason,
      event: 'login_failure',
    })
  },

  /**
   * Log a token refresh
   * @param {string} userId - The user ID
   * @param {string} requestId - The request ID
   */
  logTokenRefresh: (userId, requestId) => {
    logger.info('Token refreshed', {
      userId,
      requestId,
      event: 'token_refresh',
    })
  },

  /**
   * Log a logout
   * @param {string} userId - The user ID
   * @param {string} requestId - The request ID
   * @param {boolean} allDevices - Whether the user logged out from all devices
   */
  logLogout: (userId, requestId, allDevices = false) => {
    logger.info('User logged out', {
      userId,
      requestId,
      allDevices,
      event: allDevices ? 'logout_all_devices' : 'logout',
    })
  },

  /**
   * Log a token validation error
   * @param {string} tokenId - The token ID
   * @param {string} requestId - The request ID
   * @param {string} error - The error message
   */
  logTokenValidationError: (tokenId, requestId, error) => {
    logger.warn('Token validation failed', {
      tokenId,
      requestId,
      error,
      event: 'token_validation_error',
    })
  },

  /**
   * Log a security event
   * @param {string} event - The event type
   * @param {Object} data - Additional data about the event
   */
  logSecurityEvent: (event, data) => {
    logger.info('Security event', {
      ...data,
      event: `security_${event}`,
    })
  },
}

module.exports = authLogger
