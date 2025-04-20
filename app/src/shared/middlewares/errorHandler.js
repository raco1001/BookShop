const { StatusCodes } = require('http-status-codes')

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
  const message = err.message || '서버에서 오류 발생'

  console.error(`[ERROR] ${message}`)

  res.status(statusCode).json({
    status: 'error',
    message,
  })
}

module.exports = errorHandler
