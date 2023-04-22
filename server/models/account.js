const db = require("../config/db/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var salt = bcrypt.genSaltSync();

const account = function (account) {
  (this.id = account.id),
    (this.Username = account.Username),
    (this.Password = account.Password),
    (this.id_Role = account.id_Role);
};
account.register = function (data, result) {
  // data = [username,password,idRole,firstName,lastName,phoneNumber]
  db.query(
    "SELECT * FROM account WHERE Username = ?",
    data.Username,
    function (err, users) {
      if (err) return err;
      else if (users.length > 0) {
        result({ success: false, message: "username da duoc su dung" });
      } else {
        bcrypt.hash(data.Password, salt, (err, hash) => {
          if (err) return err;
          else {
            db.query(
              "INSERT INTO account (Username, Password, id_Role) VALUES (?, ?, ?)",
              [data.Username, hash, data.id_Role],
              function (err, user) {
                console.log(user.insertId);
                if (err) return err;
                else {
                  db.query(
                    "INSERT INTO inforuser (id_Account,FirstName,LastName,PhoneNumber,Address) VALUES (?, ?, ?, ?, ?)",
                    [
                      user.insertId,
                      data.FirstName,
                      data.LastName,
                      data.PhoneNumber,
                      data.Address
                    ],
                    function (err, users) {
                      if (err) return err;
                      else {
                        result({
                          success: true,
                          message: "đăng ký thành công",
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
account.login = function (data, result) {
  // data = [username,password]
  console.log(data);
  db.query(
    "SELECT * FROM account WHERE Username = ?",
    data.Username,
    function (err, users) {
      if (err) {
        return err;
      }
      if (users.length === 0) {
        return result({ success: false, message: "username not found" });
      }

      const user = users[0];
      db.query(
        "SELECT * FROM role WHERE id = ?",
        user.id_Role,
        function (err, role) {
          bcrypt.compare(data.Password, user.Password, function (err, results) {
            if (err) {
              return err;
            }
            // console.log(data.Password,"-",user.Password)
            // console.log(results)
            if (results === false) {
              return result({ success: false, message: "wrong password" });
            }

            const token = jwt.sign(
              {
                id: user.id,
                role: role[0].roleName,
              },
              "mk"
            );
            console.log(token);

            result({ success: true, token: token, role: role[0].roleName });
          });
        }
      );
    }
  );
};
account.find = function (id, result) {
  db.query("SELECT * FROM account WHERE id = ?", id, function (err, users) {
    if (err) {
      return err;
    } else {
      result(users[0].Username);
    }
  });
};

module.exports = account;
