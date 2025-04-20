const validateSchema = require('../../shared/middlewares/validateSchema')
const paymentRequestTypes = require('./payment-entities/payment-entities')

const validatePaymentRequest = (req, res, next) => {
  let paymentType
  if (req.params.paymentType) {
    paymentType = req.params.paymentType
  } else if (req.params.provider) {
    paymentType = req.params.provider
  } else {
    throw new Error('Invalid payment type')
  }
  const validateSchemaResult = validateSchema(paymentRequestTypes(paymentType))
  if (validateSchemaResult.error) {
    return res.status(400).json({ error: validateSchemaResult.error })
  }
  req.body.paymentType = paymentType
  next()
}

module.exports = {
  validatePaymentRequest,
}
