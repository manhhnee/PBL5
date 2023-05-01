const CartItemModel = require('../models/cart_item');
const CartModel = require('../models/cart');
const jwt = require('jsonwebtoken');


class CartItemController {
  async Create(req, res){
    const { bookSupplierId, cartId, quantity } = req.body;
    try {
      const newCartItem = await CartItemModel.createCartItem(bookSupplierId, cartId, quantity);
      res.status(201).json(newCartItem);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  }

  async Update(req, res){
    const { cartItemId } = req.params;
    const { quantity } = req.body;
    try {
      const success = await CartItemModel.updateCartItemQuantity(cartItemId, quantity);
      if (success) {
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  }

  async Delete(req, res){
    const { cartItemId } = req.params;
    try {
      const success = await CartItemModel.deleteCartItem(cartItemId);
      if (success) {
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  }
  async ShowAll(req, res) {
    try {
      const token = req.headers.authorization.split(' ')[1]; // Extract JWT from Authorization header
      const decoded = jwt.verify(token, 'mk'); // Verify JWT
      
      const cart = await CartModel.getCartByAccountId(decoded.id);
      const cartId = cart[0].id;
      const cartItems = await CartItemModel.getCartItemsByCartId(cartId);
      res.json(cartItems);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = new CartItemController()
