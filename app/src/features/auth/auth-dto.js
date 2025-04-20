const Joi = require('joi')

const requestTypes = {
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(200).required(),
  }),
  refresh: Joi.object({
    refreshToken: Joi.string().required(),
  }),
  logout: Joi.object({}),
  logoutAllDevices: Joi.object({}),
}

const responseTypes = {
  login: Joi.object({
    status: Joi.string().required(),
    data: Joi.object({
      user: Joi.object({
        id: Joi.string().required(),
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(),
      }).required(),
      accessToken: Joi.string().required(),
    }).required(),
  }),
  refresh: Joi.object({
    status: Joi.string().required(),
    message: Joi.string().required(),
    data: Joi.object({
      accessToken: Joi.string().required(),
    }).required(),
  }),
  logout: Joi.object({
    status: Joi.string().required(),
    message: Joi.string().required(),
  }),
  error: Joi.object({
    status: Joi.string().valid('error').required(),
    message: Joi.string().required(),
    requestId: Joi.string().uuid().required(),
  }),
}

module.exports = {
  requestTypes,
  responseTypes,
}
