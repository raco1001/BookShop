const cookieParser = require('cookie-parser')
const express = require('express')
const errorHandler = require('./src/shared/middlewares/errorHandler')
const app = express()
const authRouter = require('./src/features/auth/auth-router')
const userRouter = require('./src/features/users/user-router')
const bookRouter = require('./src/features/books/book-router')
const cartRouter = require('./src/features/carts/cart-router')
const orderRouter = require('./src/features/orders/order-router')
const likeRouter = require('./src/features/likes/like-router')
const paymentRouter = require('./src/features/payments/payment-router')
// const addressRouter = require('./src/features/addresses/addresses-router')
// const deliveryRouter = require('../features/deliveries/deliveryRouter');
// const reviewRouter = require('../features/reviews/review-router');

// Validate and conditionally include Swagger
const { validateSwaggerFiles } = require('./src/docs/swagger-validator')
let swaggerConfig = null

if (validateSwaggerFiles()) {
  try {
    require('./src/docs/swagger')
    swaggerConfig = require('./src/docs/swagger-config')
    console.log('Swagger documentation loaded successfully')
  } catch (error) {
    console.error('Error loading Swagger documentation:', error.message)
  }
}

const fakerRouter = require('./src/tools/faker/faker')

app.use(cookieParser())
app.use(express.json())

app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/books', bookRouter)
app.use('/likes', likeRouter)
app.use('/carts', cartRouter)
app.use('/orders', orderRouter)
app.use('/payments', paymentRouter)
// app.use('/deliveries', deliveryRouter);
// app.use('/reviews', reviewRouter);
// app.use('/addresses', addressRouter)

app.use('/faker', fakerRouter)

if (swaggerConfig) {
  app.use('/api-docs', swaggerConfig.serve, swaggerConfig.setup)
}

app.use(errorHandler)

module.exports = app
