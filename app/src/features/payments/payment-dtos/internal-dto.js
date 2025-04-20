const Joi = require('joi')

const internalEntity = (paymentType) => {
  if (paymentType === 'bankTransfer') {
    return bankTransferEntity
  } else if (paymentType === 'card') {
    return cardEntity
  } else {
    throw new Error('Invalid payment type')
  }
}

const bankTransferEntity = Joi.object({
  bankCode: Joi.string().required(),
  accountNumber: Joi.string().required(),
  accountHolderName: Joi.string().required(),
})

const cardEntity = Joi.object({
  cardProvider: Joi.string().required(),
  cardNumber: Joi.string().required(),
  cardExpirationDate: Joi.string().required(),
  cardCvc: Joi.string().required(),
})

module.exports = { internalEntity }
