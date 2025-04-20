const Joi = require('joi')

const requestTypes = {
  join: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(200).required(),
  }),
  email: Joi.object({
    email: Joi.string().email().required(),
  }),
}

const responseTypes = {
  join: Joi.object({
    status: Joi.string().required(),
    message: Joi.string().required(),
  }),
}

module.exports = {
  requestTypes,
  responseTypes,
}
