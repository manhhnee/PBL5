const db = require("../config/db/index");
const bcrypt = require("bcrypt");
var salt = bcrypt.genSaltSync();

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
          results({
            success: false,
            message: "Cập nhập thông tin người dùng thất bại",
          });
        } else {
          results({ success: true, message: "Cập nhập thành công" });
        }
      }
    );
  }
};

inforUser.getListStaff = function (results) {
  db.query(
    `SELECT a.Username,i.* FROM account a
              INNER JOIN inforuser i on  a.id = i.id_Account
              WHERE id_Role = 2`,
    [],
    function (err, staff) {
      if (err) return results({ success: false, message: err.message });
      else {
        results({ success: true, staff: staff });
      }
    }
  );
};
inforUser.deleteStaff = function (idAccount, results) {
  db.query(
    "DELETE FROM account WHERE id = ? AND id_Role = 2",
    idAccount,
    (err, staff) => {
      if (err) return results({ success: false, message: err.message });
      else
        return results({ success: true, message: "Xóa thành công nhân viên" });
    }
  );
};
inforUser.addStaff = function (data, avatarPath, results) {
  db.query(
    "SELECT * FROM account WHERE Username = ?",
    [data.Username],
    (err, users) => {
      if (err) return results({ success: false, message: err.message });
      else if (users.length > 0)
        return results({ success: false, message: "Username đã được sử dụng" });
      else {
        bcrypt.hash(data.Password, salt, (err, hash) => {
          if (err) return results({ success: false, message: err.message });
          else {
            db.query(
              "INSERT INTO account (Username, Password, id_Role) VALUES (?, ?, ?)",
              [data.Username, hash, 2],
              function (err, user) {
                if (err)
                  return results({ success: false, message: err.message });
                else if (avatarPath) {
                  db.query(
                    "INSERT INTO inforuser (id_Account,FirstName,LastName,PhoneNumber,Address,Avatar) VALUES (?, ?, ?, ?, ?, ?)",
                    [
                      user.insertId,
                      data.FirstName,
                      data.LastName,
                      data.PhoneNumber,
                      data.Address,
                      avatarPath,
                    ],
                    function (err, users) {
                      if (err)
                        return results({
                          success: false,
                          message: err.message,
                        });
                      else {
                        return results({
                          success: true,
                          message: "Tạo tài khoản nhân viên thành công",
                        });
                      }
                    }
                  );
                } else {
                  db.query(
                    "INSERT INTO inforuser (id_Account,FirstName,LastName,PhoneNumber,Address) VALUES (?, ?, ?, ?, ?)",
                    [
                      user.insertId,
                      data.FirstName,
                      data.LastName,
                      data.PhoneNumber,
                      data.Address,
                    ],
                    function (err, users) {
                      if (err)
                        return results({
                          success: false,
                          message: err.message,
                        });
                      else {
                        return results({
                          success: true,
                          message:
                            "Tạo tài khoản nhân viên thành công (không có Avatar)",
                        });
                      }
                    }
                  );
                }
              }
            );
          }
        });
      }
    }
  );
};
module.exports = inforUser;
