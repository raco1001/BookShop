const { pgEntity } = require('./pg-entities/pg-entity')
const { internalEntity } = require('./internal-entities/internal-entity')
const { easyEntity } = require('./easy-entitis/easy-entity')

const paymentRequestTypes = (paymentMethod) => {
  if (paymentMethod === 'internal') {
    return internalEntity(paymentMethod)
  } else if (paymentMethod === 'pg') {
    return pgEntity(paymentMethod)
  } else if (paymentMethod === 'easy') {
    return easyEntity(paymentMethod)
  } else {
    throw new Error('Invalid payment type')
  }
}

module.exports = paymentRequestTypes
