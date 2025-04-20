const {
  insertOrder,
  insertOrderItems,
  findOrderItemsByUser,
} = require('./order-repository')
const { uuidToBinary, binaryToUUID } = require('../../shared/utils/convertIds')
const generateUUID = require('../../shared/utils/generateUUID')
const db = require('../../database/mariadb')

const createOrder = async (userId, orderItems, addressId, amount) => {
  const priceSum = orderItems.reduce((acc, item) => acc + item.totalPrice, 0)

  if (priceSum !== amount) {
    throw new Error('결제 금액이 일치하지 않습니다.')
  }

  const userBid = uuidToBinary(userId)
  const orderBid = uuidToBinary(generateUUID())
  const addressBid = uuidToBinary(addressId)
  const conn = await db.getConnection()
  await conn.beginTransaction()
  try {
    await insertOrder(conn, orderBid, userBid, addressBid, amount)
    const modifiedItems = orderItems.map((item) => ({
      ...item,
      orderItemBid: uuidToBinary(generateUUID()),
    }))
    await insertOrderItems(conn, userBid, orderBid, modifiedItems)
    await conn.commit()
  } catch (err) {
    await conn.rollback()
    throw err
  } finally {
    conn.release()
  }
  const orderId = binaryToUUID(orderBid)
  return orderId
}

const getOrderItemsByUser = async (userId, pageSize, pageNumber) => {
  const userBid = uuidToBinary(userId)
  return await findOrderItemsByUser(userBid, pageSize, pageNumber)
}

module.exports = {
  getOrderItemsByUser,
  createOrder,
}
