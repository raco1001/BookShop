const Joi = require('joi')

const addressSchema = Joi.object({
  name: Joi.string().required(),
  recipientName: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  addressLine1: Joi.string().required(),
  addressLine2: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  postalCode: Joi.string().required(),
  countryCode: Joi.string().required(),
  isDefault: Joi.boolean().required(),
})

module.exports = { addressSchema }
