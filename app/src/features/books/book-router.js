const express = require('express')
const router = express.Router()
const { getBooksByRange, getBookById } = require('./book-controller')

router.route('/lists').get(getBooksByRange)

router.route('/details/:id').get(getBookById)

module.exports = router
