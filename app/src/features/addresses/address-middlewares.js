const { addressSchema } = require('./address-entities')
const validateSchema = require('../../shared/middlewares/validateSchema')
const validateAddress = () => {
  return validateSchema(addressSchema)
}

module.exports = { validateAddress }
