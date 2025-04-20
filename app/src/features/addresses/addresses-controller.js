const {
  createUserAddress,
  returnUserAddresses,
  updateUserAddress,
  deleteUserAddress,
} = require('./addresses-service')

const addUserAddress = async (req, res, next) => {
  try {
    const { address } = req.body

    const addAddressResult = await createUserAddress(address)

    if (!addAddressResult) {
      throw new Error('주소 추가 실패')
    }

    res.status(200).json({ message: '주소 추가 성공' })
  } catch (err) {
    next(err)
  }
}

const getUserAddresses = async (req, res, next) => {
  try {
    const userAddress = await returnUserAddresses()

    if (!userAddress) {
      throw new Error('주소 조회 실패')
    }

    res.status(200).json(userAddress)
  } catch (err) {
    next(err)
  }
}

const modifyUserAddress = async (req, res, next) => {
  try {
    const modifyAddressResult = await updateUserAddress(address)

    if (!modifyAddressResult) {
      throw new Error('주소 수정 실패')
    }

    res.status(200).json({ message: '주소 수정 성공' })
  } catch (err) {
    next(err)
  }
}

const eraseUserAddress = async (req, res, next) => {
  try {
    const deleteAddressResult = await deleteUserAddress(address)

    if (!deleteAddressResult) {
      throw new Error('주소 삭제 실패')
    }

    res.status(200).json({ message: '주소 삭제 성공' })
  } catch (err) {
    next(err)
  }
}
module.exports = {
  addUserAddress,
  getUserAddresses,
  modifyUserAddress,
  eraseUserAddress,
}
