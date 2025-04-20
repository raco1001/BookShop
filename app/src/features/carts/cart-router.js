const express = require('express')
const router = express.Router()
const {
  getCartItems,
  addToCart,
  updateCartItem,
  deleteFromCart,
} = require('./cart-controller')

const { validateAccessToken } = require('../auth/auth-middleware')

router
  .route('/')
  .get(validateAccessToken, getCartItems)
  .post(validateAccessToken, addToCart)
  .put(validateAccessToken, updateCartItem)
  .delete(validateAccessToken, deleteFromCart)

module.exports = router
