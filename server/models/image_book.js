const db = require("../config/db/index");

const image_book = function (image_book) {
<<<<<<< HEAD
  (this.id = image_book.id),
    (this.id_Book = image_book.id_Book),
    (this.Image = image_book.Image);
};
image_book.add = function (data, results) {
  db.query(
    "INSERT INTO image_book (id_Book, Image) VALUES (?, ?)",
    [data.id_Book, data.Image],
    function (err, images) {
      if (err) return err;
      else {
        results({ success: true, message: "thêm thành công" });
      }
    }
  );
};
=======
    this.id = image_book.id,
        this.id_Book = image_book.id_Book,
        this.Image = image_book.Image

}
image_book.add = function (idBook,BookPath, results) {
    db.query("INSERT INTO image_book (id_Book, Image) VALUES (?, ?)",
    [idBook,BookPath], function (err, images) {
        if (err) return err
        else {
            results({ success: true, message: 'thêm thành công' })
        }
    })
}
>>>>>>> hao
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
        results({ success: true, message: "xóa thành công" });
      }
    }
  );
};

module.exports = image_book;
