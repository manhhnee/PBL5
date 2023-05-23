const CartItemModel = require('../models/cart_item');
const CartModel = require('../models/cart');
const jwt = require('jsonwebtoken');


class CartItemController {
  async Add(req, res){
    try {
      const token = req.headers.authorization.split(' ')[1]; // Extract JWT from Authorization header
      const decoded = jwt.verify(token, 'mk'); // Verify JWT
      const accountId = decoded.id;
      const {bookId, quantity} = req.body;
  
      // Check if the book exists and retrieve its information
      const [book] = await db.query('SELECT * FROM books WHERE id = ?', [bookId]);
  
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      // Check if the user has an existing cart
      const [cart] = await db.query('SELECT * FROM cart WHERE id_Account = ?', [accountId]);
  
      if (!cart) {
        // If the user doesn't have a cart yet, create a new cart for them
        await db.query('INSERT INTO cart (id_Account) VALUES (?)', [accountId]);
      }
  
      // Add the book to the cart or update its quantity if it already exists in the cart
      const [cartItem] = await db.query(
        'SELECT * FROM cart_items WHERE id_Cart = ? AND id_Book = ?',
        [cart.id, bookId]
      );
  
      if (!cartItem) {
        await db.query(
          'INSERT INTO cart_items (id_Cart, id_Book, quantity) VALUES (?, ?, ?)',
          [cart.id, bookId, quantity]
        );
      } else {
        await db.query(
          'UPDATE cart_items SET quantity = ? WHERE id_Cart = ? AND id_Book = ?',
          [cartItem.quantity + quantity, cart.id, bookId]
        );
      }
  
      res.status(200).json({ message: 'Book added to cart successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
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
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, 'mk');

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
