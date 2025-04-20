const express = require('express')
const router = express.Router()
const {
  createPayment,
  getPayments,
  addPaymentProvider,
} = require('./payment-controller')
const { validateAccessToken } = require('../auth/auth-middleware')
const { validatePaymentRequest } = require('./payment-middleware')

router
  .route('/internal/:paymentType')
  .post(validateAccessToken, validatePaymentRequest, createPayment)
  .get(validateAccessToken, getPayments)

router
  .route('/pg/:provider')
  .post(validateAccessToken, validatePaymentRequest, createPayment)
  .get(validateAccessToken, getPayments)

router
  .route('/easy/:provider')
  .post(validateAccessToken, validatePaymentRequest, createPayment)
  .get(validateAccessToken, getPayments)

router.route('/providers').post(validateAccessToken, addPaymentProvider)

module.exports = router
