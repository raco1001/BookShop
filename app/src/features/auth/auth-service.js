const {
  findUser,
  storeRefreshToken,
  getStoredRefreshToken,
} = require('./auth-repository')
const {
  verifyPassword,
  generateAccessToken,
  hashPassword,
} = require('./auth-utils')
const { binaryToUUID, uuidToBinary } = require('../../shared/utils/convertIds')
const { AuthError } = require('./auth-utils')

const authenticateUser = async (email, password) => {
  try {
    const { userBid, name, storedEmail, storedPassword, salt } =
      await findUser(email)

    if (!userBid) {
      throw new AuthError('Invalid email.', 401)
    }

    const validatePassword = verifyPassword(password, salt, storedPassword)

    if (!validatePassword) {
      throw new AuthError('Invalid password.', 401)
    }

    const userId = binaryToUUID(userBid)
    const userName = name
    const userEmail = storedEmail

    const {
      accessToken,
      refreshToken,
      user: userData,
    } = generateTokens(userId, userName, userEmail)

    const refreshTokenResult = await storeRefreshToken(userBid, refreshToken)
    if (refreshTokenResult[0].affectedRows !== 1) {
      throw new AuthError('Failed to store refresh token.', 500)
    }

    return {
      user: userData,
      tokens: { accessToken, refreshToken },
    }
  } catch (error) {
    throw error
  }
}

const refreshAccessToken = async (userId, userRefreshToken) => {
  const userBId = uuidToBinary(userId)
  const refreshAuthResult = await getStoredRefreshToken(userBId)

  if (!refreshAuthResult) {
    throw new AuthError('User not found.', 404)
  }

  const { email, refresh_token: storedToken, name } = refreshAuthResult

  if (!storedToken || storedToken !== userRefreshToken) {
    throw new AuthError('Invalid refresh token. Please login again.', 401)
  }

  const accessToken = generateAccessToken(userId, name, email)

  return accessToken
}

module.exports = {
  authenticateUser,
  refreshAccessToken,
}
