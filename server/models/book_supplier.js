const db = require('../config/db/index')

const BookSupplierModel = {
  // Lấy thông tin BookSupplier bằng id_Book
  async getBookSupplierByIdBook(id_Book) {
    const sql = 'SELECT * FROM book_supplier WHERE id_Book = ?'
    try {
      const result = await db.query(sql, id_Book)
      console.log(result)
      return result.length ? result : null
    } catch (err) {
      return err
    } 
  }
  ,
  async getBookSupplierByIdBookAndIdSupplier (idBook, idSupplier) {
    const sql = `SELECT * FROM book_supplier WHERE id_Book = ? AND id_Supplier = ?`
    const result = await db.query(sql, [idBook, idSupplier])

    if (!result || !result.length) {
      return null
    }

    return result[0]
  },
  async addBookSupplier(bookSupplier) {
    try {
      await db.query('INSERT INTO book_supplier SET ?', bookSupplier);
      const result = await db.query('SELECT LAST_INSERT_ID()');
      console.log(result)
      return result[0]['LAST_INSERT_ID()'];
    } finally {
      await db.end();
    }
  },
  async getMaxImportPriceByIdBook(id_Book) {
    const sql =
      'SELECT * FROM book_supplier WHERE id_Book = ? ORDER BY Import_Price DESC LIMIT 1'
    const result = await db.query(sql, [id_Book])
    return result.length ? result[0] : null
  }
}

module.exports = BookSupplierModel
