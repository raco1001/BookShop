const express = require('express')
const router = express.Router()
const { validateJoin, validateEmail } = require('./user-middleware')
const {
  register,
  getUserById,
  deleteUser,
  authenticatUserByEmail,
  resetPassword,
} = require('./user-controller')

const { validateAccessToken } = require('../auth/auth-middleware')

router.post('/join', validateJoin, register)

router
  .route('/:id')
  .get(validateAccessToken, getUserById)
  .delete(validateAccessToken, deleteUser)

router.route('/validateEmail').post(validateEmail, authenticatUserByEmail)

router.route('/reset/:userId').put(resetPassword)

module.exports = router
