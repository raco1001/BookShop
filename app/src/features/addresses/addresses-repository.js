const db = require('../../database/mariadb')

const createAddress = async (address) => {
  const [result] = await db.query('INSERT INTO addresses SET ?', [address])
  return result.insertId
}

const findAddresses = async () => {
  const [rows] = await db.query('SELECT * FROM addresses')
  return rows
}

const updateAddress = async (address) => {
  const [result] = await db.query('UPDATE addresses SET ? WHERE id = ?', [
    address,
    address.id,
  ])
  return result.affectedRows > 0
}

const deleteAddress = async (address) => {
  const [result] = await db.query('DELETE FROM addresses WHERE id = ?', [
    address.id,
  ])
  return result.affectedRows > 0
}

module.exports = {
  createAddress,
  findAddresses,
  updateAddress,
  deleteAddress,
}
