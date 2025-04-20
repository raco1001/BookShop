import axios from 'axios'

const initiate = async (userId, paymentInfo) => {
  const pgParams = generatePGParams(paymentInfo)
  const response = await externalPGAPI.request(pgParams)
  await paymentRepo.insertPGPayment(userId, paymentInfo, response)
  return response
}

const confirmTossPayment = async (req, res) => {
  const { paymentKey, orderId, amount } = req.body

  try {
    const response = await axios.post(
      'https://api.tosspayments.com/v1/payments/confirm',
      {
        paymentKey,
        orderId,
        amount,
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`${process.env.TOSS_SECRET_KEY}:`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
      },
    )

    const data = response.data

    if (data.status === 'DONE') {
      await orderService.updateStatus(orderId, 'PAID')
      await paymentRepository.save({
        paymentKey,
        method: data.method,
        amount: data.totalAmount,
        orderId,
      })

      return res.status(200).json({ success: true, message: '결제 성공' })
    } else {
      return res
        .status(400)
        .json({ success: false, message: '결제 미완료 상태' })
    }
  } catch (err) {
    console.error(err?.response?.data || err)
    return res.status(500).json({ success: false, message: '결제 승인 실패' })
  }
}

module.exports = { initiate }
