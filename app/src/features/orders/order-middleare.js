const { requestTypes } = require('./order-entities')
const validateSchema = require('../../shared/middlewares/validateSchema')

const validateOrder = () => {
  if (req.method === 'POST' && req.path === '/orders') {
    return validateSchema(requestTypes.createOrder)
  } else if (req.method === 'PUT' && req.path === '/orders') {
    return validateSchema(requestTypes.updateOrderItem)
  } else if (req.method === 'GET' && req.path === '/orders/history') {
    return validateSchema(requestTypes.getOrderItems)
  }
}

module.exports = { validateOrder }
