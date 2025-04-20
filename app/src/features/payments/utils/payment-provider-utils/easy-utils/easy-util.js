// payments.controller.ts
import axios from 'axios'

const confirmEasyPayment = async (req, res) => {
  const { paymentId, orderId } = req.body
  if (paymentId === 'npay') {
    return confirmNPayPayment(req, res)
  }
}

const confirmNPayPayment = async (req, res) => {
  const { paymentId, orderId } = req.body

  try {
    const response = await axios.post(
      `https://dev-api.naver.com/your-partner-id/naverpay/payments/v2/apply/payment`,
      new URLSearchParams({ paymentId }).toString(),
      {
        headers: {
          'X-Naver-Client-Id': process.env.NPAY_CLIENT_ID,
          'X-Naver-Client-Secret': process.env.NPAY_CLIENT_SECRET,
          'X-NaverPay-Chain-Id': process.env.NPAY_CHAIN_ID,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )

    const data = response.data

    if (data.code === 'Success') {
      await orderService.updateStatus(orderId, 'PAID')
      return res.status(200).json({ success: true, message: '결제 완료' })
    } else {
      console.error(data)
      return res.status(400).json({ success: false, message: data.message })
    }
  } catch (err) {
    console.error(err)
    return res.status(500).json({ success: false, message: '서버 오류' })
  }
}

module.exports = { confirmEasyPayment }
