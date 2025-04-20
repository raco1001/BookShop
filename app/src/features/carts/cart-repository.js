const db = require('../../connections/mariadb')

const insertCartItem = async (userId, productId, count) => {
  console.log('insertCartItem', userId, productId, count)
  const query = `
        INSERT INTO carts (user_id, product_id, count)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE count = count + ? , updated_at = NOW()
    `
  await db.query(query, [userId, productId, count, count])
}

const updateCartItem = async (userId, productId, count) => {
  const query = `
      UPDATE carts
      SET count = ?, updated_at = NOW()
      WHERE user_id = ? AND product_id = ?
    `
  await db.query(query, [count, userId, productId])
}

const findCartItemsByUser = async (userId) => {
  const query = `
        SELECT 
            a.user_id  as userId,
            c.id as bookId,
            b.main_category,
            b.img_path,
            b.price,
            a.count,
            c.title,
            c.author,
            c.pages,
            c.summary
        FROM (
            SELECT user_id, product_id, count, updated_at
            FROM carts 
            WHERE user_id = ?
        ) a 
        JOIN (
            SELECT * FROM products 
            WHERE product_table_name = 'books') b ON a.product_id = b.id
        JOIN books c ON b.id = c.id
        ORDER BY a.updated_at DESC
    `
  const [rows] = await db.query(query, [userId])
  return rows
}

const deleteCartItem = async (userId, productId) => {
  if (!userId || !productId) return 0

  const query = `DELETE FROM carts WHERE user_id = ? AND product_id = ?`

  await db.query(query, [userId, productId])
}

module.exports = {
  insertCartItem,
  deleteCartItem,
  findCartItemsByUser,
  updateCartItem,
}
