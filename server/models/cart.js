const db = require('../config/db/index')

class CartModel {
  async getCartByAccountId(accountId) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM cart WHERE id_Account = ?`, [accountId], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res)
        }
      });
    });
  };
}

module.exports = new CartModel()
