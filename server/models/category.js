const db = require("../config/db/index");

const category = function (category) {
  (this.id = category.id),
    (this.Name = category.Name),
    (this.Image = category.Image);
};
category.add = function (data, results) {
  db.query(
    "INSERT INTO category (Name, Image) VALUES (?, ?)",
    [data.Name, data.Image],
    function (err, categories) {
      if (err) return err;
      else {
        results({ success: true, message: "Thêm thành công" });
      }
    }
  );
};
category.find = function (data, results) {
  if (!data.id) {
    db.query("SELECT * FROM category", function (err, categories) {
      if (err) return err;
      else {
        results(categories);
      }
    });
  } else {
    db.query(
      "SELECT * FROM category WHERE id = ?",
      data.id,
      function (err, categories) {
        if (err) return err;
        else {
          results(categories[0]);
        }
      }
    );
  }
};
category.delete = function (idCategory, results) {
  db.query(
    "DELETE FROM category WHERE id =?",
    idCategory,
    function (err, categories) {
      if (err) return err;
      else {
        console.log(categories);
        results({ success: true, message: "Xóa thành công" });
      }
    }
  );
};
category.update = function (idCategory, data, results) {
  db.query(
    "UPDATE category SET Name =?, Image =? WHERE id =?",
    [data.Name, data.Image, idCategory],
    function (err, categories) {
      if (err) return err;
      else {
        results({ success: true, message: "Cập nhật thành công" });
      }
    }
  );
};
module.exports = category;
