const db = require("../config/db/index");

const supplier = function (supplier) {
  (this.Name = supplier.Name), (this.Address = supplier.Address);
};
supplier.add = function (data, results) {
  db.query(
    "INSERT INTO supplier ( Name, Address) VALUES (?, ?)",
    [data.Name, data.Address],
    function (err, suppliers) {
      if (err) return err;
      else {
        results({ success: true, message: "Thêm nhà cung cấp thành công" });
      }
    }
  );
};
supplier.find = function (data, results) {
  if (!data.id) {
    db.query("SELECT * FROM supplier", function (err, suppliers) {
      if (err) return err;
      else {
        results(suppliers);
      }
    });
  } else {
    db.query(
      "SELECT * FROM supplier WHERE id = ?",
      data.id,
      function (err, suppliers) {
        if (err) return err;
        else {
          results(suppliers[0]);
        }
      }
    );
  }
};
supplier.delete = function (idSupplier, results) {
  db.query(
    "DELETE FROM supplier WHERE id =?",
    idSupplier,
    function (err, suppliers) {
      if (err) return err;
      else {
        results({ success: true, message: "Xóa nhà cung cấp thành công" });
      }
    }
  );
};
supplier.update = function (idSupplier, data, results) {
  db.query(
    "UPDATE supplier SET Name =?,Address=? WHERE id =?",
    [data.Name, data.Address, idSupplier],
    function (err, suppliers) {
      if (err) return err;
      else {
        results({ success: true, message: "Cập nhật thành công" });
      }
    }
  );
};
module.exports = supplier;
