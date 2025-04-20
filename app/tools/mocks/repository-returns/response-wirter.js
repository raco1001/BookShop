const fs = require('fs')
const path = require('path')

const db = require('../../app/src/database/mariadb')
const { uuidToBinary } = require('../../../src/shared/utils/convertIds')
const { generateUUID } = require('../../../src/shared/utils/generateUUID')

const userId = '5648a3d2-00da-4f47-96d6-ee596e380d92'
const productId = 'ebb7b7cd-0dee-11f0-910e-c277ba14597b'
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// book-repository
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const findResponse = async () => {
  const [response] = await db.query('SELECT * FROM books')

  const returnsDir = path.join(__dirname, '.', 'returns')
  if (!fs.existsSync(returnsDir)) {
    fs.mkdirSync(returnsDir, { recursive: true })
  }

  const filePath = path.join(returnsDir, 'read.json')
  fs.writeFileSync(filePath, JSON.stringify(response, null, 2))

  return response
}

const findBooks = async () => {
  const startDate = '2020-01-01'
  const endDate = '2025-01-01'
  const page = 1
  const limit = 10
  const category = 'ALL'
  const keyword = ''

  const range = `WHERE publication_date BETWEEN ${startDate} AND ${endDate}`
  const finalCategory =
    category === 'ALL' ? '' : `AND main_category = '${category}'`
  const finalKeyword =
    keyword === '' ? '' : `AND title LIKE '%${keyword.trim()}%'`
  const [books] = await db.query(`    
    SELECT 
      LOWER(CONCAT_WS('-',
          SUBSTR(HEX(b.id), 1, 8),
          SUBSTR(HEX(b.id), 9, 4),
          SUBSTR(HEX(b.id), 13, 4),
          SUBSTR(HEX(b.id), 17, 4),
          SUBSTR(HEX(b.id), 21)
      )) AS id
      ,b.title
      ,b.author
      ,b.summary
      ,a.likes
      ,a.price
      ,a.img_path
    FROM (
      SELECT 
        id
        ,likes
        ,price
        ,img_path
      FROM
        products
      WHERE product_table_name = 'books'
      ${finalCategory} 
    ) a 
    JOIN (  
      SELECT id, title,category_id, author, summary 
      FROM books
        ${range}
        ${finalKeyword}
      ) b 
    ON a.id = b.id
    JOIN(SELECT id, name FROM categories) c 
    ON b.category_id = c.id
    JOIN(SELECT product_id, img_url FROM images
      WHERE display_order = 0) i
    ON a.id = i.product_id
    LIMIT ${limit} OFFSET ${(page - 1) * limit}
  `)

  const pagenations = {}
  pagenations.totalPages = books.length ? Math.ceil(books.length / 10) : 1
  pagenations.currentPage = page

  const [totalCount] = await db.query(`
    SELECT COUNT(*) AS count FROM books
    ${range}
    ${finalCategory}
    ${finalKeyword}
  `)
  console.log(totalCount)
  pagenations.totalCount = totalCount[0].count

  const response = {
    books: books,
    pagenations: pagenations,
  }

  const returnsDir = path.join(__dirname, '.', 'returns/books')
  if (!fs.existsSync(returnsDir)) {
    fs.mkdirSync(returnsDir, { recursive: true })
  }

  const filePath = path.join(returnsDir, 'read.json')
  fs.writeFileSync(filePath, JSON.stringify(response, null, 2))

  return response
}

const findBookDetail = async (
  userId = '5648a3d2-00da-4f47-96d6-ee596e380d92',
  bookId = 'ebb7b7cd-0dee-11f0-910e-c277ba14597b',
) => {
  try {
    const userBid = uuidToBinary(userId)
    const bookBid = uuidToBinary(bookId)

    // Use parameterized query to prevent SQL injection
    const [response] = await db.query(
      `
      SELECT 
        p.id as bookId,
        p.main_category,
        JSON_ARRAYAGG(bi.img_url ORDER BY bi.display_order) AS images,
        p.price,
        b.title,
        b.category_id,
        b.format,
        b.author,
        b.isbn,
        b.pages,
        b.summary,
        b.description,
        b.table_of_contents,
        b.publication_date,
        (SELECT COUNT(*) FROM user_likes WHERE user_id = ? AND product_id = ?) as isLiked
      FROM (
        SELECT
          id,
          main_category,
          likes,
          price,
          img_path
        FROM products
        WHERE id = ?
      ) p
      LEFT OUTER JOIN (
        SELECT * FROM images
        WHERE product_id = ?
      ) bi ON p.id = bi.product_id
      JOIN (
        SELECT
          id,
          title,
          category_id,
          format,
          author,
          isbn,
          pages,
          summary,
          description,
          table_of_contents,
          publication_date
        FROM books
        WHERE id = ?
      ) b ON p.id = b.id
      GROUP BY p.id, p.main_category, p.price, b.title, b.category_id, b.format, 
              b.author, b.isbn, b.pages, b.summary, b.description, b.table_of_contents, b.publication_date
    `,
      [userBid, bookBid, bookBid, bookBid, bookBid],
    )

    const returnsDir = path.join(__dirname, '.', 'returns/books')
    if (!fs.existsSync(returnsDir)) {
      fs.mkdirSync(returnsDir, { recursive: true })
    }

    // Write response to JSON file
    const filePath = path.join(returnsDir, 'detailRead.json')
    fs.writeFileSync(filePath, JSON.stringify(response, null, 2))

    return response
  } catch (error) {
    console.error('Error in findBookDetail:', error)
    throw error
  }
}

const topBooks = async () => {
  const [mainCategoryId] = findCategoryPath()

  const [response] = await db.query(`
    SELECT * FROM books
    WHERE category_id = ${mainCategoryId}
    ORDER BY likes DESC
    LIMIT 4
  `)
  const returnsDir = path.join(__dirname, '.', 'returns/books')
  if (!fs.existsSync(returnsDir)) {
    fs.mkdirSync(returnsDir, { recursive: true })
  }

  const filePath = path.join(returnsDir, 'topBooks.json')
  fs.writeFileSync(filePath, JSON.stringify(response, null, 2))

  return response
}

const findCategoryPath = async () => {
  const categoryId = 4
  const [response] = await db.query(`    
    WITH RECURSIVE category_path (id, parent_id, name, depth) AS (
      SELECT id, parent_id, name, 1
      FROM categories
      WHERE id = ${categoryId}

      UNION ALL

      SELECT c.id, c.parent_id, c.name, cp.depth + 1
      FROM categories c
      JOIN category_path cp ON cp.parent_id = c.id
    )
    SELECT * FROM category_path ORDER BY depth DESC
  `)
  const returnsDir = path.join(__dirname, '.', 'returns/books')
  if (!fs.existsSync(returnsDir)) {
    fs.mkdirSync(returnsDir, { recursive: true })
  }

  // Write response to JSON file
  const filePath = path.join(returnsDir, 'categoryPath.json')
  fs.writeFileSync(filePath, JSON.stringify(response, null, 2))

  return response
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// cart-repository
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const insertCartItem = async (userId, productId, count) => {
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

const findCartItemsByUser = async () => {
  const userBid = uuidToBinary(userId)
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
  const [response] = await db.query(query, [userBid])

  const returnsDir = path.join(__dirname, '.', 'returns/carts')
  if (!fs.existsSync(returnsDir)) {
    fs.mkdirSync(returnsDir, { recursive: true })
  }

  // Write response to JSON file
  const filePath = path.join(returnsDir, 'cartItems.json')
  fs.writeFileSync(filePath, JSON.stringify(response, null, 2))
}

const deleteCartItem = async () => {
  const userBid = uuidToBinary(userId)
  const productBid = uuidToBinary(productId)
  if (!userId || !productId) return 0

  const query = `DELETE FROM carts WHERE user_id = ? AND product_id = ?`

  await db.query(query, [userBid, productBid])
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// likes-repository
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const findLikes = async () => {
  const userBid = uuidToBinary(userId)
  const productBid = uuidToBinary(productId)
  const [response] = await db.query(
    'SELECT user_id FROM user_likes WHERE user_id = ? AND product_id = ?',
    [userBid, productBid],
  )
  const returnsDir = path.join(__dirname, '.', 'returns/likes')
  if (!fs.existsSync(returnsDir)) {
    fs.mkdirSync(returnsDir, { recursive: true })
  }

  // Write response to JSON file
  const filePath = path.join(returnsDir, 'likes.json')
  fs.writeFileSync(filePath, JSON.stringify(response, null, 2))
}

const insertLike = async (userId, productId) => {
  console.log('query starts')
  const [result] = await db.query(
    'INSERT user_likes (product_id, user_id) VALUES (?, ?)',
    [productId, userId],
  )

  return result.affectedRows
}
const deleteLike = async (userId, productId) => {
  const [result] = await db.query(
    'DELETE FROM user_likes WHERE user_id = ? AND product_id = ?',
    [userId, productId],
  )
  return result.affectedRows
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// order-repository
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const findOrderItemsByUser = async () => {
  const userBid = uuidToBinary(userId)
  const pageSize = 10
  const pageNumber = 1
  const offset = (pageNumber - 1) * pageSize
  const query = `
        SELECT oi.count, p.id as product_id, p.product_table_name, p.price, p.img_path
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        WHERE oi.user_id = ?
        LIMIT ? OFFSET  ?
    `
  const [response] = await db.query(query, [userBid, pageSize, offset])

  const returnsDir = path.join(__dirname, '.', 'returns/orders')
  if (!fs.existsSync(returnsDir)) {
    fs.mkdirSync(returnsDir, { recursive: true })
  }

  // Write response to JSON file
  const filePath = path.join(returnsDir, 'orders.json')
  fs.writeFileSync(filePath, JSON.stringify(response, null, 2))
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// user-repository
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const findUserById = async () => {
  const userBid = uuidToBinary(userId)
  const [response] = await db.query(
    'SELECT id, name, email FROM users WHERE id = ?',
    [userBid],
  )
  const returnsDir = path.join(__dirname, '.', 'returns/users')
  if (!fs.existsSync(returnsDir)) {
    fs.mkdirSync(returnsDir, { recursive: true })
  }

  // Write response to JSON file
  const filePath = path.join(returnsDir, 'userById.json')
  fs.writeFileSync(filePath, JSON.stringify(response, null, 2))
}

findUserByEmail = async () => {
  const email = '2@test.com'
  const [response] = await db.query(
    'SELECT id, name, email FROM users WHERE email = ?',
    [email],
  )
  const returnsDir = path.join(__dirname, '.', 'returns/users')
  if (!fs.existsSync(returnsDir)) {
    fs.mkdirSync(returnsDir, { recursive: true })
  }

  // Write response to JSON file
  const filePath = path.join(returnsDir, 'userByEmail.json')
  fs.writeFileSync(filePath, JSON.stringify(response, null, 2))
}

const createUser = async () => {
  try {
    const userId = generateUUID()
    const userBid = uuidToBinary(userId)
    const name = '3333'
    const email = '3@test.com'
    const password = '3333'
    const salt = '3333'

    const result = await db.query(
      'INSERT INTO users (id, name, email, password, salt) VALUES (?, ?, ?, ?, ?)',
      [userBid, name, email, password, salt],
    )
    const response = result[0].affectedRows
    const returnsDir = path.join(__dirname, '.', 'returns/users')
    if (!fs.existsSync(returnsDir)) {
      fs.mkdirSync(returnsDir, { recursive: true })
    }

    // Write response to JSON file
    const filePath = path.join(returnsDir, 'createUser.json')
    fs.writeFileSync(filePath, JSON.stringify(response, null, 2))
  } catch (error) {
    throw error
  }
}

// findCategoryPath()
findBooks()
// findResponse()
// findBookDetail()

// findCategoryPath()

// findLikes()

// findUserById()
// findUserByEmail()
// createUser()
