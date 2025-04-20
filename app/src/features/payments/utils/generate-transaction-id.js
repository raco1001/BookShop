const crypto = require('crypto')

const generateTransactionId = () => {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const randomPart = crypto.randomBytes(6).toString('hex').toUpperCase()
  return `TXN${datePart}${randomPart}`
}

module.exports = { generateTransactionId }
