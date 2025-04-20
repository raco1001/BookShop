const db = require('../../connections/mariadb')

const insertOrder = async (conn, orderInfo) => {
  const query = `
        INSERT INTO orders (id, address_id, amount)
        VALUES (?, ?, ?)
    `

  const values = [orderInfo.orderBid, orderInfo.addressBid, orderInfo.amount]

  await conn.query(query, values)
}

const insertOrderItems = async (conn, userBid, orderBid, orderItems) => {
  const query = `
        INSERT INTO order_items (id, order_id, user_id, product_id, count, total_price)
        VALUES ${orderItems.map(() => '(?, ?, ?, ?, ?, ?)').join(', ')}
    `

  const values = orderItems.flatMap((item) => [
    item.orderItemBid,
    orderBid,
    userBid,
    item.productId,
    item.count,
    item.totalPrice,
  ])

  await conn.query(query, values)
}

// const removeItemsTx = async (conn, userId, productIds) => {
//   const placeholders = productIds.map(() => '?').join(',')
//   const query = `
//         DELETE FROM carts WHERE user_id = ? AND product_id IN (${placeholders})
//     `
//   await conn.query(query, [userId, ...productIds])
// }

const findOrderItemsByUser = async (uid, pageSize, pageNumber) => {
  const offset = (pageNumber - 1) * pageSize
  const query = `
        SELECT oi.count, p.id as product_id, p.product_table_name, p.price, p.img_path
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        WHERE oi.user_id = ?
        LIMIT ? OFFSET  ?
    `
  const [rows] = await db.query(query, [uid, pageSize, offset])
  return rows
}

module.exports = {
  insertOrder,
  insertOrderItems,
  findOrderItemsByUser,
}
