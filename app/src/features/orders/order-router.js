const express = require('express')
const router = express.Router()
const { getOrderItems, initOrder } = require('./order-controller')
const { validateAccessToken } = require('../auth/auth-middleware')
const { validateOrder } = require('./order-middleware')
router.route('/').post(validateAccessToken, validateOrder, initOrder)

router.route('/history').get(validateAccessToken, validateOrder, getOrderItems)

module.exports = router
