const CartModel = require('../models/cart')
const jwt = require('jsonwebtoken')

class CartController {
  async getCartByAccountId(req, res) {
    const token = req.headers.authorization.split(' ')[1]; // Extract JWT from Authorization header
    const decoded = jwt.verify(token, 'mk'); // Verify JWT
  
    try {
      const cart = await CartModel.getCartByAccountId(decoded.id);
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json({ message: "Failed to get cart", error: err });
    }
  }
}

module.exports = new CartController()
