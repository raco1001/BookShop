const { confirmEasyPayment } = require('./easy-utils/easy-util')
const { confirmPgPayment } = require('./pg-utils/pg-util')
const { confirmInternalPayment } = require('./internal-utils/internal-util')

const paymentProviders = {
  easy: confirmEasyPayment,
  pg: confirmPgPayment,
  internal: confirmInternalPayment,
}

module.exports = { paymentProviders }
