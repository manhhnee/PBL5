const db = require("../config/db/index");

class CartItem {
  constructor(id, cartId,  quantity) {
    this.id = id;
    this.cartId = cartId;
    this.quantity = quantity;
  }

  async create() {
    await db.execute(
      "INSERT INTO cart_item (id_Cart, quantity) VALUES (?, ?)",
      [this.cartId, this.quantity]
    );
    return this;
  }

  static async getByCartId(cartId) {
    const [rows] = await db.execute(
      "SELECT * FROM cart_item WHERE id_Cart = ?",
      [cartId]
    );
    const cartItems = rows.map(
      (row) => new CartItem(row.id, row.cart_id, row.book_id, row.quantity)
    );
    return cartItems;
  }
}

module.exports = CartItem;
