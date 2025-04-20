const db = require('../../connections/mariadb')
const { binaryToUUID } = require('../../shared/utils/convertIds')

const createUser = async (id, name, email, password, salt) => {
  try {
    console.log(`유저 생성 중: ${id}, ${name}, ${email}, ${password}, ${salt}`)
    const result = await db.query(
      'INSERT INTO users (id, name, email, password, salt) VALUES (?, ?, ?, ?, ?)',
      [id, name, email, password, salt],
    )
    const affectedRows = result[0].affectedRows
    console.log(`${affectedRows}`)
    return affectedRows
  } catch (error) {
    throw error
  }
}

findUserById = async (userId) => {
  const [rows] = await db.query(
    'SELECT id, name, email FROM users WHERE id = ?',
    [userId],
  )
  return rows.length ? rows[0] : null
}

findUserByEmail = async (email) => {
  const [rows] = await db.query(
    'SELECT id, name, email FROM users WHERE email = ?',
    [email],
  )
  console.log('rows', JSON.stringify(rows))
  rows[0].id = binaryToUUID(rows[0].id)
  return rows.length ? rows[0] : null
}

deleteUserById = async (userId) => {
  const [result] = await db.query('DELETE FROM users WHERE id = ?', [userId])
  return result.affectedRows
}

updateUserById = async (userId, password) => {
  const [result] = await db.query(
    'UPDATE users SET password = ? WHERE id = ? ',
    [password, userId],
  )
  return result.affectedRows
}

module.exports = {
  createUser,
  findUserById,
  findUserByEmail,
  deleteUserById,
  updateUserById,
}
