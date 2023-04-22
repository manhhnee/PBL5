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
    "SELECT * FROM inforuser WHERE id_Account = ?",
    idAccount,
    (err, infor) => {
      if (err) throw err;
      results(infor[0]);
    }
  );
};
module.exports = inforUser;
