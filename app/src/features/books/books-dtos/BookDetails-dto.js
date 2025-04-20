const Joi = require('joi')

class BookDetail {
  constructor(
    id,
    main_category,
    images,
    price,
    title,
    category_id,
    format,
    author,
    isbn,
    pages,
    summary,
    description,
    table_of_contents,
    publication_date,
    isLiked,
  ) {
    this.id = id
    this.main_category = main_category
    this.images = images
    this.price = price
    this.title = title
    this.category_id = category_id
    this.format = format
    this.author = author
    this.isbn = isbn
    this.pages = pages
    this.summary = summary
    this.description = description
    this.table_of_contents = table_of_contents
    this.publication_date = publication_date
    this.isLiked = isLiked
  }
}

class BookDetailReturn {
  constructor() {
    this.bookDetail = null
    this.categoryPath = []
  }

  static fromRawData(rawData) {
    const result = new BookDetailReturn()

    if (rawData.bookDetail) {
      result.bookDetail = new BookDetail(
        rawData.bookDetail.id,
        rawData.bookDetail.main_category,
        rawData.bookDetail.images,
        rawData.bookDetail.price,
        rawData.bookDetail.title,
        rawData.bookDetail.category_id,
        rawData.bookDetail.format,
        rawData.bookDetail.author,
        rawData.bookDetail.isbn,
        rawData.bookDetail.pages,
        rawData.bookDetail.summary,
        rawData.bookDetail.description,
        rawData.bookDetail.table_of_contents,
        rawData.bookDetail.publication_date,
        rawData.bookDetail.isLiked,
      )
    }

    if (Array.isArray(rawData.categoryPath)) {
      result.categoryPath = rawData.categoryPath
    }

    return result
  }
}

const bookDetailSchema = Joi.object({
  id: Joi.string().required(),
  main_category: Joi.string().required(),
  images: Joi.string().required(),
  price: Joi.number().required(),
  title: Joi.string().required(),
  category_id: Joi.string().required(),
  format: Joi.string().required(),
  author: Joi.string().required(),
  isbn: Joi.string().required(),
  pages: Joi.number().required(),
  summary: Joi.string().required(),
  description: Joi.string().required(),
  table_of_contents: Joi.string().allow(null).required(),
  publication_date: Joi.string().required(),
  isLiked: Joi.number().required(),
})

const bookDetailReturnSchema = Joi.object({
  bookDetail: bookDetailSchema.allow(null),
  categoryPath: Joi.array().items(Joi.string()),
})

module.exports = {
  BookDetail,
  BookDetailReturn,
  bookDetailSchema,
  bookDetailReturnSchema,
}
