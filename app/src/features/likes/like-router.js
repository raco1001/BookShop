const express = require('express')
const router = express.Router()
const { addLike, removeLike } = require('./like-controller')
const { validateAccessToken } = require('./../auth/auth-middleware')

router
  .route('/')
  .post(validateAccessToken, addLike)
  .delete(validateAccessToken, removeLike)

module.exports = router
