const db = require("../config/db/index");

const rating = function (rating) {
  (this.id = rating.id),
    (this.id_Book = rating.id_Book),
    (this.id_Account = rating.id_Account),
    (this.star = rating.star),
    (this.commemt = rating.commemt);
};
rating.add = function (data, results) {
  db.query(
    "INSERT INTO rating (id_Book,id_Account, star,comment) VALUES (?, ?, ?, ?)",
    [data.id_Book, data.id_Account, data.star, data.commemt],
    function (err, ratings) {
      if (err) return err;
      else {
        results({ success: true, message: "thêm thành công" });
      }
    }
  );
};
rating.find = function (data, results) {
  db.query(
    "SELECT * FROM rating WHERE id_Book = ?",
    data.idBook,
    function (err, ratings) {
      if (err) return err;
      else {
        results(ratings);
      }
    }
  );
};
rating.findOne = function (data, results) {
  db.query(
    "SELECT * FROM rating WHERE id_Book = ? AND id_Account = ?",
    [data.idBook, data.idAccount],
    function (err, rating) {
      if (err) return err;
      else {
        results(rating);
      }
    }
  );
};

rating.update = function (idRating, data, results) {
  db.query(
    "UPDATE rating SET star =?, comment = ? WHERE id =?",
    [data.star, data.comment, idRating],
    function (err, rating) {
      if (err) return err;
      else {
        results({ success: true, message: "cập nhật thành công" });
      }
    }
  );
};

rating.delete = function (idRating, results) {
  db.query("DELETE FROM rating WHERE id =?", idRating, function (err, images) {
    if (err) return err;
    else {
      results({ success: true, message: "xóa thành công" });
    }
  });
};

module.exports = rating;
