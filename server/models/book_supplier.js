const db = require('../config/db/index')

const BookSupplierModel = {
  // Lấy thông tin BookSupplier bằng id_Book
  async getBookSupplierByBookId (id_Book) {
    const sql = `SELECT * FROM book_supplier WHERE id_Book = ${id_Book}`
    const results = await db.query(sql)
    if (!results || !results.length) {
      throw new Error('Không tìm thấy BookSupplier với id_Book này')
    }
    return results
  }
}

module.exports = BookSupplierModel
