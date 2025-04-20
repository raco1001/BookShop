const paymentRepo = require('../../../payment-repository')

const handle = async (userId, paymentInfo) => {
  const result = await paymentRepo.insertInternalPayment(userId, paymentInfo)
  return result
}
module.exports = { handle }
