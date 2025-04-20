const {
  findUserById,
  deleteUserById,
  updateUserById,
  findUserByEmail,
  createUser,
} = require('./user-repository')
const { hashPassword } = require('../auth/auth-utils')
const { generateUUID } = require('../../shared/utils/generateUUID')
const { uuidToBinary } = require('../../shared/utils/convertIds')

const registerUser = async (name, email, password) => {
  console.log(
    `[registerUser] 요청 받음!!!!!!!!!!!: ${name}, ${email}, ${password}`,
  )
  const existingUser = await findUserByEmail(email)
  console.log(existingUser)
  if (existingUser !== null) {
    throw new Error('Email already exists.')
  }

  const { salt, hashedPassword } = hashPassword(password)
  const uid = generateUUID() // Get UUID directly
  const bid = uuidToBinary(uid)

  const affectedRows = await createUser(bid, name, email, hashedPassword, salt)
  console.log(`[registerUser] 영향받은 행 수: ${affectedRows}`)
  return affectedRows
}

getUser = async (userId) => {
  return await findUserById(userId)
}

getUserByEmail = async (email) => {
  return await findUserByEmail(email)
}

removeUser = async (userId) => {
  return await deleteUserById(userId)
}

updateUserPassword = async (userId, password) => {
  const userBid = uuidToBinary(userId)
  const { hashedPassword } = hashPassword(password)
  return await updateUserById(userBid, hashedPassword)
}

module.exports = {
  registerUser,
  getUser,
  getUserByEmail,
  removeUser,
  updateUserPassword,
}
