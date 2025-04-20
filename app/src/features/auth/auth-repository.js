const db = require('../../connections/mariadb')

const findUser = async (email, password) => {
  try {
    const [rows] = await db.query(
      'SELECT id, name, email, password, salt FROM users WHERE email = ? AND password = ?',
      [email, password],
    )
    return rows.length > 0 ? rows[0] : {}
  } catch (error) {
    throw error
  }
}

const storeRefreshToken = async (userBid, refreshToken) => {
  try {
    const result = await db.query(
      'UPDATE users SET refresh_token = ? WHERE id = ?',
      [refreshToken, userBid],
    )
    return result
  } catch (error) {
    throw error
  }
}

const getStoredRefreshToken = async (userBid) => {
  try {
    const [rows] = await db.query(
      'SELECT email, name, refresh_token FROM users WHERE id = ?',
      [userBid],
    )
    return rows.length > 0 ? rows[0] : null
  } catch (error) {
    throw error
  }
}

module.exports = {
  findUser,
  storeRefreshToken,
  getStoredRefreshToken,
}
