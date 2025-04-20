const joi = require('joi')

const createOrderSchema = joi.object({
  userId: joi.string().required(),
  orderInfo: joi
    .object({
      orderItems: joi
        .object({
          productId: joi.string().required(),
          count: joi.number().required(),
          totalPrice: joi.number().required(),
        })
        .required(),
    })
    .required(),
  addressId: joi.string().required(),
  amount: joi.number().required(),
})

const updateOrderItemSchema = joi.object({
  userId: joi.string().required(),
  productId: joi.string().required(),
  count: joi.number().required(),
})

const getOrderItemsSchema = joi.object({
  userId: joi.string().required(),
  pageSize: joi.number().required(),
  pageNumber: joi.number().required(),
})

module.exports = {
  createOrderSchema,
  updateOrderItemSchema,
  getOrderItemsSchema,
}
