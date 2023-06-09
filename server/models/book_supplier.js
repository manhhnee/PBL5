const db = require("../config/db/index");

const book_supplier = function (book_supplier) {
  (this.id = book_supplier.id),
    (this.id_Book = book_supplier.id_Book),
    (this.id_Supplier = book_supplier.id_Supplier),
    (this.Import_Price = book_supplier.Import_Price),
    (this.Amount = book_supplier.Amount);
};

book_supplier.add = function (data, results) {
  db.query(
    "SELECT * FROM book_supplier WHERE id_Book = ? AND id_Supplier = ? AND Import_Price = ?",
    [data.id_Book, data.id_Supplier, data.Import_Price],
    (err, book_suppliers) => {
      if (err) return results({ success: false, message: err.message });
      //kiem tra neu da ton tai mat hang nay cung gia nhap r thi them vao chu ko tao moi
      if (book_suppliers.length > 0) {
        db.query(
          "UPDATE book_supplier SET Amount = ? WHERE id = ?",
          [
            parseInt(book_suppliers[0].Amount) + parseInt(data.Amount),
            book_suppliers[0].id,
          ],
          (err, book_supplier) => {
            if (err) return results({ success: false, message: err.message });
            else
              return results({
                success: true,
                message: "Update số lượng sản phẩm thành công",
              });
          }
        );
      } else {
        db.query(
          "INSERT INTO book_supplier (id_Book, id_Supplier, Import_Price, Amount) VALUES (?, ?, ?, ?)",
          [data.id_Book, data.id_Supplier, data.Import_Price, data.Amount],
          (err, book_Supplier) => {
            if (err) return results({ success: false, message: err.message });
            else
              return results({
                success: true,
                message: "Thêm sản phẩm vào kho thành công",
              });
          }
        );
      }
    }
  );
};
book_supplier.delete = function (id_BookSupplier, results) {
  db.query(
    "DELETE FROM book_supplier WHERE id = ?",
    id_BookSupplier,
    (err, book_supplier) => {
      if (err) return results({ success: false, message: err.message });
      else
        return results({
          success: true,
          message: "Xóa sản phẩm trong kho thành công",
        });
    }
  );
};
book_supplier.show = function (results) {
  var query = `SELECT bs.*, b.Name,b.Price,s.Name as Supplier 
                    FROM book_supplier bs
                    INNER JOIN book b ON b.id = bs.id_Book
                    INNER JOIN supplier s ON s.id = bs.id_Supplier
                    ORDER BY bs.id DESC`;
  db.query(query, [], (err, bookSuppliers) => {
    if (err) return results({ success: false, message: err.message });
    else return results(bookSuppliers);
  });
};
module.exports = book_supplier;
