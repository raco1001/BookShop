const db = require('../../database/mariadb')
const { insertPaymentProvider, insertPayment } = require('./payment-repository')
const { generateUUID } = require('../../shared/utils/generateUUID')
const { uuidToBinary } = require('../../shared/utils/convertIds')
const { generateTransactionId } = require('./utils/generate-transaction-id')
const { insertOrder, insertOrderItems } = require('../orders/order-repository')
const { deleteCartItems } = require('../carts/cart-repository')

const createPaymentProvider = (providerName, providerType) => {
  const id = generatePK().binaryId
  console.log(id)
  const insertPaymentProviderResult = insertPaymentProvider(
    id,
    providerName,
    providerType,
  )

  if (!insertPaymentProviderResult) {
    return false
  }

  return true
}

const processPayment = async (userId, paymentInfos) => {
  const paymentMethod = paymentInfos.paymentMethod
  const conn = await db.getConnection()
  try {
    await conn.beginTransaction()

    const { providerId, addressId, data } = paymentInfos
    const paymentBid = uuidToBinary(generateUUID())
    const userBid = uuidToBinary(userId)
    const providerBid = uuidToBinary(providerId)
    const addressBid = uuidToBinary(addressId)

    const amount = data.reduce((acc, val) => acc + val.price * val.count, 0)
    const transactionId = generateTransactionId()
    const receipt = 'receipt'

    const paymentInfo = {
      id: paymentBid,
      user_id: userBid,
      provider_id: providerBid,
      method: paymentMethod,
      transaction_id: transactionId,
      amount: amount,
      receipt: receipt,
    }

    const paymentResult = await paymentProviders[paymentMethod](
      userId,
      paymentInfo,
    )

    if (!paymentResult) {
      throw new Error('결제 실패')
    }

    const insertPaymentResult = await insertPayment(paymentResult)

    if (!insertPaymentResult) {
      throw new Error('결제 정보 저장 실패')
    }

    const orderBid = generatePK().binaryId
    const orderInfo = { orderBid, paymentBid, addressBid, amount }
    await insertOrder(orderInfo)

    const orderItemInfo = data.map((val) => ({
      orderItemBid: uuidToBinary(generateUUID()),
      orderBid,
      productBid: uuidToBinary(val.productId),
      price: val.price,
      count: val.count,
      totalPrice: val.price * val.count,
    }))

    await insertOrderItems(orderItemInfo)
    const cartItemBids = data.map((val) => uuidToBinary(val.cartId))

    await deleteCartItems(cartItemBids)

    await conn.commit()
  } catch (err) {
    await conn.rollback()
    throw err
  } finally {
    conn.release()
  }
}

module.exports = { createPaymentProvider, processPayment }
