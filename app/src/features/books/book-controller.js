const { getBooks, getBookDetail } = require('./book-service')
const { BooksReturns } = require('./entities/returns/BooksReturns')
const { BookDetailReturn } = require('./entities/returns/BookDetailsReturns')
const jwt = require('jsonwebtoken')

const getBooksByRange = async (req, res, next) => {
  try {
    const books = await getBooks({ params: req.query })

    res.status(200).json({
      status: 'success',
      data: BooksReturns.fromRawData(books),
    })
  } catch (error) {
    console.error('Error in getBooksByRange controller:', error)
    next(error)
  }
}

const getBookById = async (req, res, next) => {
  try {
    const bookId = req.params.id

    let userId = null
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      userId = decoded.id
    }

    if (!bookId) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Book ID is required.' })
    }

    const bookDetails = await getBookDetail({ bookId, userId })

    if (!bookDetails.bookDetail) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Book not found.' })
    }

    res.status(200).json({
      status: 'success',
      data: BookDetailReturn.fromRawData(bookDetails),
    })
  } catch (error) {
    console.error('Error in getBookById controller:', error)
    next(error)
  }
}

module.exports = { getBooksByRange, getBookById }
