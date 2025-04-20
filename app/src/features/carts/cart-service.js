const {
  findCartItemsByUser,
  insertCartItem,
  updateCartItem,
  deleteCartItem,
} = require('./cart-repository')
const { uuidToBinary, binaryToUUID } = require('../../shared/utils/convertIds')

const getCartItemsByUserId = async (userId) => {
  const userBid = uuidToBinary(userId)
  const cartItems = await findCartItemsByUser(userBid)
  const transformed = cartItems.map((item) => ({
    ...item,
    userId: binaryToUUID(item.userId),
    bookId: binaryToUUID(item.bookId),
  }))
  return transformed
}

const addCartItem = async (userId, productId, count) => {
  const userBid = uuidToBinary(userId)
  const productBid = uuidToBinary(productId)
  return await insertCartItem(userBid, productBid, count)
}

const modifyCartItem = async (userId, productId) => {
  const userBid = uuidToBinary(userId)
  const productBid = uuidToBinary(productId)
  return await updateCartItem(userBid, productBid)
}

const removeCartItem = async (userId, productId) => {
  const userBid = uuidToBinary(userId)
  const productBid = uuidToBinary(productId)

  return await deleteCartItem(userBid, productBid)
}

module.exports = {
  addCartItem,
  removeCartItem,
  getCartItemsByUserId,
  modifyCartItem,
}
