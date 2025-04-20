const { getOrderItemsByUser, createOrder } = require('./order-service')

const initOrder = async (req, res, next) => {
  try {
    const { userId } = req.userId
    const { orderItems, addressId, amount } = req.body
    const orderId = await createOrder(userId, orderItems, addressId, amount)

    res
      .status(201)
      .json({ status: 'success', orderId: orderId, message: '주문 생성 완료' })
  } catch (err) {
    next(err)
  }
}

const getOrderItems = async (req, res, next) => {
  try {
    const userId = req.query.userId
    const pageSize = Number(req.query.pageSize)
    const pageNumber = Number(req.query.pageNumber)
    const items = await getOrderItemsByUser(userId, pageSize, pageNumber)
    res.status(200).json({ status: 'success', data: items })
  } catch (err) {
    next(err)
  }
}

module.exports = { initOrder, getOrderItems }
