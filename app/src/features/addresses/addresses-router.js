const express = require('express')
const router = express.Router()
const {
  addUserAddress,
  getUserAddresses,
  modifyUserAddress,
  eraseUserAddress,
} = require('./addresses-controller')
const { validateAccessToken } = require('../auth/auth-middleware')
router
  .route('/')
  .post(validateAccessToken, addUserAddress)
  .get(validateAccessToken, getUserAddresses)
  .put(validateAccessToken, modifyUserAddress)
  .delete(validateAccessToken, eraseUserAddress)

module.exports = router
