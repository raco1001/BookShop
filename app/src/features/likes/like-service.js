const { findLikes, insertLike, deleteLike } = require('./like-repository')
const {
  uuidToBinary,
  binaryToUUID,
} = require('./../../shared/utils/convertIds')
getLike = async (userId, productId) => {
  const userBid = uuidToBinary(userId)
  const productBid = uuidToBinary(productId)
  const likeUser = await findLikes(userBid, productBid)

  if (likeUser) {
    return 1
  } else {
    return 0
  }
}

createLike = async (userId, productId) => {
  const userBid = uuidToBinary(userId)
  const productBid = uuidToBinary(productId)
  const result = await insertLike(userBid, productBid)

  return result
}

deleteLikeIfExists = async (userId, productId) => {
  const exists = await findLikes(userId, productId)
  if (!exists) {
    return 0
  }

  const result = await deleteLike(userId, productId)

  return result
}

module.exports = {
  getLike,
  createLike,
  deleteLikeIfExists,
}
