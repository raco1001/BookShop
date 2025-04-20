const Joi = require('joi')

const pgEntity = (paymentType) => {
  if (paymentType === 'toss') {
    return tossEntity
  } else {
    throw new Error('Invalid payment type')
  }
}
const tossEntity = Joi.object({
  paymentKey: Joi.string().required(),
  orderId: Joi.string().required(),
  amount: Joi.number().required(),
})

module.exports = {
  pgEntity,
}
