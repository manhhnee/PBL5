const CartItem = require("../models/cart_item");

class CartItemController {
  async getAllCartItems(req, res) {
    try {
      const { accountId } = req.params;
      const cartItems = await CartItem.getAllByAccountId(accountId);
      return res.json({ success: true, cartItems });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  async addCartItem(req, res) {
    try {
      const { accountId } = req.params;
      const { productId, quantity } = req.body;

      // Check if the product is already in the cart
      const cartItem = await CartItem.getByProductId(accountId, productId);

      if (cartItem) {
        // Update the existing cart item
        await CartItem.update(cartItem.id, quantity);
        return res.json({ success: true, message: "Cart item updated" });
      } else {
        // Add a new cart item
        await CartItem.create({ accountId, productId, quantity });
        return res.json({ success: true, message: "Cart item added" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  async deleteCartItem(req, res) {
    try {
      const { accountId, cartItemId } = req.params;
      const cartItem = await CartItem.getById(cartItemId);

      // Check if the cart item belongs to the specified account
      if (cartItem && cartItem.accountId === accountId) {
        await CartItem.deleteById(cartItemId);
        return res.json({ success: true, message: "Cart item deleted" });
      } else {
        return res.status(404).json({ success: false, message: "Cart item not found" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }
}

module.exports = new CartItemController();
