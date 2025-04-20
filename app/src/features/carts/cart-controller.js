const {
  getCartItemsByUserId,
  addCartItem,
  modifyCartItem,
  removeCartItem,
} = require('./cart-service')

const getCartItems = async (req, res, next) => {
  try {
    const userId = req.userId
    console.log(userId)
    const items = await getCartItemsByUserId(userId)
    res.status(200).json({ status: 'success', data: items })
  } catch (err) {
    next(err)
  }
}

const addToCart = async (req, res, next) => {
  try {
    console.log('addToCart', req.userId)
    const userId = req.userId
    console.log('userId', userId)
    const { productId, count } = req.body
    await addCartItem(userId, productId, count)
    res
      .status(201)
      .json({ status: 'success', message: '장바구니에 상품 추가 완료' })
  } catch (err) {
    next(err)
  }
}

const updateCartItem = async (req, res, next) => {
  try {
    const userId = req.userId
    const { productId, count } = req.body
    if (count < 1) {
      await removeCartItem(userId, productId)
    } else {
      await modifyCartItem(userId, productId, count)
    }
    res
      .status(200)
      .json({ status: 'success', message: '장바구니 상품 수량 업데이트 완료' })
  } catch (err) {
    next(err)
  }
}

const deleteFromCart = async (req, res, next) => {
  try {
    const userId = req.userId
    const { productId } = req.body
    await removeCartItem(userId, productId)
    res
      .status(200)
      .json({ status: 'success', message: '장바구니에서 상품 제거 완료' })
  } catch (err) {
    next(err)
  }
}

module.exports = { addToCart, deleteFromCart, getCartItems, updateCartItem }
