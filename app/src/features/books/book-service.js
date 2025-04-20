const {
  findBooks,
  findBookDetail,
  getBooksTotalCount,
} = require('./book-repository')
const { uuidToBinary } = require('../../shared/utils/convertIds')
const { format, subMonths } = require('date-fns')

const getBooks = async ({ params }) => {
  try {
    const {
      keyword = '',
      category = 'ALL',
      startDate,
      endDate,
      page = 1,
      limit = 8,
    } = params

    const dateData = {
      defaultStartDate: '',
      defaultEndDate: '',
    }

    if (!startDate || !endDate) {
      dateData.defaultStartDate = format(subMonths(new Date(), 3), 'yyyy-MM-dd')
      dateData.defaultEndDate = format(new Date(), 'yyyy-MM-dd')
    } else {
      dateData.defaultStartDate = startDate
      dateData.defaultEndDate = endDate
    }

    const pageInt = parseInt(page, 10)
    const limitInt = parseInt(limit, 10)

    const books = await findBooks({
      keyword: keyword,
      category: category,
      startDate: dateData.defaultStartDate,
      endDate: dateData.defaultEndDate,
      page: pageInt,
      limit: limitInt,
    })
    const totalCount = await getBooksTotalCount({
      keyword: keyword,
      category: category,
      startDate: dateData.defaultStartDate,
      endDate: dateData.defaultEndDate,
    })

    return {
      books: books,
      pagenations: {
        totalCount: totalCount,
        totalPages: totalCount > 0 ? Math.ceil(totalCount / limitInt) : 1,
        currentPage: pageInt,
      },
    }
  } catch (error) {
    console.error('Error in getBooks service:', error)
    throw error
  }
}

const getBookDetail = async ({ bookId, userId }) => {
  try {
    if (!bookId) {
      throw new Error('Book ID is required')
    }

    const bookBid = uuidToBinary(bookId)
    const userBid = userId ? uuidToBinary(userId) : null

    const bookDetails = await findBookDetail(bookBid, userBid)

    if (!bookDetails.bookDetail) {
      return { bookDetail: null, categoryPath: [] }
    }

    bookDetails.bookDetail.id = bookId

    return bookDetails
  } catch (error) {
    console.error('Error in getBookDetail service:', error)
    throw error
  }
}

module.exports = { getBooks, getBookDetail }
