const {
  createAddress,
  findAddresses,
  updateAddress,
  deleteAddress,
} = require('./addresses-repository')

const createUserAddress = async (address) => {
  const addAddressResult = await createAddress(address)
  return addAddressResult
}

const returnUserAddresses = async () => {
  const userAddresses = await findAddresses()
  return userAddresses
}

const updateUserAddress = async (address) => {
  const updateAddressResult = await updateAddress(address)
  return updateAddressResult
}
const deleteUserAddress = async (address) => {
  const deleteAddressResult = await deleteAddress(address)
  return deleteAddressResult
}

module.exports = {
  createUserAddress,
  returnUserAddresses,
  updateUserAddress,
  deleteUserAddress,
}
