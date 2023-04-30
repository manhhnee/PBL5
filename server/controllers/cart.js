const CartModel = require('../models/cart')
const jwt = require('jsonwebtoken')

class CartController {
  async getCartByAccountId(req, res, next) {
    try {
      // Lấy accountId từ decoded token
      const decoded = jwt.verify(req.cookies.token, 'mk');
      const accountId = decoded.id;
  
      // Gọi hàm getCartByAccountId để lấy thông tin giỏ hàng
      const cart = await CartModel.getCartByAccountId(accountId);
  
      // Trả về kết quả
      res.json({ success: true, cart });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new CartController()
