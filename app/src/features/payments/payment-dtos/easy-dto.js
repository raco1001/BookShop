const Joi = require('joi')
const easyEntity = (paymentType) => {
  if (paymentType === 'npay') {
    return npayEntity
  } else {
    throw new Error('Invalid payment type')
  }
}

const npayEntity = Joi.object({
  paymentId: Joi.string().required(),
  orderId: Joi.string().required(),
})

module.exports = {
  easyEntity,
}
