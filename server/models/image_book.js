const db = require("../config/db/index");

const image_book = function (image_book) {
  (this.id = image_book.id),
    (this.id_Book = image_book.id_Book),
    (this.Image = image_book.Image);
};
image_book.add = function (idBook, BookPath, results) {
  db.query(
    "SELECT * FROM image_book WHERE id_Book = ? ",
    [idBook],
    (err, images) => {
      if (err) return results({ success: false, message: err.message });
      else if (images.length >= 3)
        return results({ success: false, message: "Số ảnh tối đa là 3 ảnh" });
      else {
        db.query(
          "INSERT INTO image_book (id_Book, Image) VALUES (?, ?)",
          [idBook, BookPath],
          function (err, images) {
            if (err) return results({ success: false, message: err.message });
            else {
              return results({ success: true, message: "Thêm ảnh thành công" });
            }
          }
        );
      }
    }
  );
};
image_book.find = function (data, results) {
  db.query(
    "SELECT * FROM image_book WHERE id_Book = ?",
    data.idBook,
    function (err, images) {
      if (err) return err;
      else {
        results(images);
      }
    }
  );
};

image_book.delete = function (idImage_book, results) {
  db.query(
    "DELETE FROM image_book WHERE id =?",
    idImage_book,
    function (err, images) {
      if (err) return err;
      else {
        results({ success: true, message: "Xóa thành công" });
      }
    }
  );
};

module.exports = image_book;
