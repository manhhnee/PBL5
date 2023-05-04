const db = require("../config/db/index");

const inforUser = function (inforUser) {
  (this.id = inforUser.id),
    (this.id_Account = inforUser.id_Account),
    (this.FirstName = inforUser.FirstName),
    (this.LastName = inforUser.LastName),
    (this.PhoneNumber = inforUser.PhoneNumber),
    (this.Address = inforUser.Address),
    (this.Avatar = inforUser.Avatar);
};
inforUser.findWithAccountId = function (idAccount, results) {
  db.query(
    `SELECT inforuser.*, account.Username
              FROM inforuser
              JOIN account ON inforuser.id_Account = account.id 
              WHERE inforuser.id_Account = ?`,
    idAccount,
    (err, infor) => {
      if (err) throw err;
      results(infor[0]);
    }
  );
};

inforUser.update = function (idAccount, avatarPath, data, results) {
  if (avatarPath) {
    db.query(
      "UPDATE inforuser SET FirstName=?,LastName=?,PhoneNumber=?,Address=?,Avatar=? WHERE id_Account = ?",
      [
        data.FirstName,
        data.LastName,
        data.PhoneNumber,
        data.Address,
        avatarPath,
        idAccount,
      ],
      (err, result) => {
        if (err) {
          results({ success: false, message: "failed to update" });
        } else {
          results({ success: true, message: "updated successfully" });
        }
      }
    );
  } else {
    // Ngược lại, không có ảnh đại diện mới thì chỉ cập nhật thông tin người dùng
    db.query(
      "UPDATE inforuser SET FirstName = ?,LastName = ?,PhoneNumber=?,Address=? WHERE id_Account = ?",
      [
        data.FirstName,
        data.LastName,
        data.PhoneNumber,
        data.Address,
        idAccount,
      ],
      (err, result) => {
        if (err) {
          results({ success: false, message: "failed to update" });
        } else {
          results({ success: true, message: "updated successfully" });
        }
      }
    );
  }
};
module.exports = inforUser;
