const express = require('express')
const router = express.Router()
const { faker } = require('@faker-js/faker')
const db = require('../../src/connections/mariadb')
const { v4: uuidv4 } = require('uuid')

router.route('/user').get((req, res) => {
  res.status(200).json({
    id: faker.string.uuid(),
    fullName: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    contact: faker.phone.number(),
  })
})

router.route('/users').get((req, res) => {
  const count = req.query.count
  const users = []
  for (let i = 0; i < count; i++) {
    users.push({
      id: faker.string.uuid(),
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      contact: faker.phone.number(),
    })
  }
  res.status(200).json(users)
})

// Generate a single book
router.route('/book').get((req, res) => {
  const bookId = uuidv4()
  const book = {
    id: bookId,
    title: faker.commerce.productName(),
    author: faker.person.fullName(),
    summary: faker.lorem.paragraph(),
    description: faker.lorem.paragraphs(3),
    price: parseInt(faker.commerce.price({ min: 1000, max: 50000 })),
    format: faker.helpers.arrayElement(['Hardcover', 'Paperback', 'E-Book']),
    isbn: faker.commerce.isbn(),
    pages: faker.number.int({ min: 100, max: 1000 }),
    publication_date: faker.date.past().toISOString(),
    main_category: faker.helpers.arrayElement([
      'Fiction',
      'Non-Fiction',
      'Science',
      'History',
      'Biography',
    ]),
    likes: faker.number.int({ min: 0, max: 1000 }),
    img_path: faker.image.urlLoremFlickr({ category: 'book' }),
    table_of_contents: faker.lorem.paragraphs(2),
  }
  res.status(200).json(book)
})

// Generate multiple books
router.route('/books').get((req, res) => {
  const count = parseInt(req.query.count) || 10
  const books = []
  for (let i = 0; i < count; i++) {
    const bookId = uuidv4()
    books.push({
      id: bookId,
      title: faker.commerce.productName(),
      author: faker.person.fullName(),
      summary: faker.lorem.paragraph(),
      description: faker.lorem.paragraphs(3),
      price: parseInt(faker.commerce.price({ min: 1000, max: 50000 })),
      format: faker.helpers.arrayElement(['Hardcover', 'Paperback', 'E-Book']),
      isbn: faker.commerce.isbn(),
      pages: faker.number.int({ min: 100, max: 1000 }),
      publication_date: faker.date.past().toISOString(),
      main_category: faker.helpers.arrayElement([
        'Fiction',
        'Non-Fiction',
        'Science',
        'History',
        'Biography',
      ]),
      likes: faker.number.int({ min: 0, max: 1000 }),
      img_path: faker.image.urlLoremFlickr({ category: 'book' }),
      table_of_contents: faker.lorem.paragraphs(2),
    })
  }
  res.status(200).json(books)
})

// Insert books into database
router.route('/books/insert').post(async (req, res) => {
  try {
    const count = parseInt(req.query.count) || 5
    const insertedBooks = []

    // Get category IDs
    const [categories] = await db.query('SELECT id, name FROM categories')
    const categoryMap = categories.reduce((acc, cat) => {
      acc[cat.name] = cat.id
      return acc
    }, {})

    for (let i = 0; i < count; i++) {
      const bookId = uuidv4()
      const mainCategory = faker.helpers.arrayElement([
        'Fiction',
        'Non-Fiction',
        'Science',
        'History',
        'Biography',
      ])
      const categoryId = categoryMap[mainCategory] || 1 // Default to 1 if category not found

      // Insert into books table
      const bookData = {
        id: bookId,
        title: faker.commerce.productName(),
        author: faker.person.fullName(),
        summary: faker.lorem.paragraph(),
        description: faker.lorem.paragraphs(3),
        format: faker.helpers.arrayElement([
          'Hardcover',
          'Paperback',
          'E-Book',
        ]),
        isbn: faker.commerce.isbn(),
        pages: faker.number.int({ min: 100, max: 1000 }),
        publication_date: faker.date.past(),
        category_id: categoryId,
        table_of_contents: faker.lorem.paragraphs(2),
      }

      await db.query(
        `INSERT INTO books (id, title, author, summary, description, format, isbn, pages, publication_date, category_id, table_of_contents) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          bookData.id,
          bookData.title,
          bookData.author,
          bookData.summary,
          bookData.description,
          bookData.format,
          bookData.isbn,
          bookData.pages,
          bookData.publication_date,
          bookData.category_id,
          bookData.table_of_contents,
        ],
      )

      // Insert into products table
      const price = parseInt(faker.commerce.price({ min: 1000, max: 50000 }))
      const likes = faker.number.int({ min: 0, max: 1000 })
      const imgPath = faker.image.urlLoremFlickr({ category: 'book' })

      await db.query(
        `
        INSERT INTO products (id, product_table_name, main_category, likes, price, img_path, created_at) 
        VALUES (?, 'books', ?, ?, ?, ?, NOW())`,
        [bookData.id, mainCategory, likes, price, imgPath],
      )

      const imageCount = faker.number.int({ min: 1, max: 5 })
      for (let j = 0; j < imageCount; j++) {
        await db.query(
          `INSERT INTO images (product_id, img_url, display_order) 
          VALUES (?, ?, ?)`,
          [bookData.id, faker.image.urlLoremFlickr({ category: 'book' }), j],
        )
      }

      insertedBooks.push({
        id: bookData.id,
        title: bookData.title,
        author: bookData.author,
        price,
        main_category: mainCategory,
      })
    }

    res.status(201).json({
      message: `Successfully inserted ${count} books`,
      books: insertedBooks,
    })
  } catch (error) {
    console.error('Error inserting books:', error)
    res.status(500).json({
      message: 'Failed to insert books',
      error: error.message,
    })
  }
})

module.exports = router
