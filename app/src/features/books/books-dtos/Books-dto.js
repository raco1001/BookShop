const Joi = require('joi')

class Book {
  constructor(id, title, author, summary, likes, price, img_path) {
    this.id = id
    this.title = title
    this.author = author
    this.summary = summary
    this.likes = likes
    this.price = price
    this.img_path = img_path
  }
}

class Pagination {
  constructor(totalPages, currentPage, totalCount) {
    this.totalPages = totalPages
    this.currentPage = currentPage
    this.totalCount = totalCount
  }
}

class BooksReturns {
  constructor() {
    this.books = []
    this.pagenations = new Pagination(0, 0, 0)
  }

  static fromRawData(rawData) {
    const result = new BooksReturns()

    if (rawData.pagenations) {
      result.pagenations = new Pagination(
        rawData.pagenations.totalPages,
        rawData.pagenations.currentPage,
        rawData.pagenations.totalCount,
      )
    }

    if (Array.isArray(rawData.books)) {
      result.books = rawData.books.map(
        (book) =>
          new Book(
            book.id,
            book.title,
            book.author,
            book.summary,
            book.likes,
            book.price,
            book.img_path,
          ),
      )
    }

    return result
  }
}

const bookSchema = Joi.object({
  id: Joi.string().uuid().required(),
  title: Joi.string().required(),
  author: Joi.string().required(),
  summary: Joi.string().required(),
  likes: Joi.number().integer().required(),
  price: Joi.number().integer().required(),
  img_path: Joi.string().required(),
})

const paginationSchema = Joi.object({
  totalPages: Joi.number().integer().min(0).required(),
  currentPage: Joi.number().integer().min(1).required(),
  totalCount: Joi.number().integer().min(0).required(),
})

const booksReturnsSchema = Joi.object({
  books: Joi.array().items(bookSchema),
  pagenations: paginationSchema,
})

module.exports = {
  Book,
  Pagination,
  BooksReturns,
  bookSchema,
  paginationSchema,
  booksReturnsSchema,
}
