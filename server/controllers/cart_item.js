const CartItemModel = require("../models/cart_item");
const CartModel = require("../models/cart");
const BookSupplierModel = require("../models/book_supplier");
const jwt = require("jsonwebtoken");

class CartItemController {
  async Add(req, res) {
    const id_Book = parseInt(req.params.id_Book);
    const quantity = parseInt(req.body.quantity);

    try {
      // Tìm thông tin của sách và nhà cung cấp
      let bookSupplier = await BookSupplierModel.getBookSupplierByIdBook(
        id_Book
      );

      if (!bookSupplier) {
        return res.status(404).json({ message: "Book supplier not found" });
      }

      const id_Supplier = bookSupplier.id_Supplier;
      const Import_Price = bookSupplier.Import_Price;
      const Amount = bookSupplier.Amount;

      // Lấy thông tin giỏ hàng của user
      const decoded = jwt.verify(req.cookies.token, "mk");
      const accountId = decoded.id;
      const cart = await CartModel.getCartByAccountId(accountId);
      const idCart = cart[0].id;

      // Tìm cart item tương ứng trong giỏ hàng
      const cartItem = await CartItemModel.getCartItemByIdBookSupplierAndIdCart(
        bookSupplier.id,
        idCart
      );

      if (cartItem) {
        // Nếu đã có trong giỏ hàng thì cập nhật số lượng
        const updatedQuantity = cartItem.quantity + quantity;
        await CartItemModel.updateCartItemQuantity(
          cartItem.id,
          updatedQuantity
        );
        res.json({ message: `Added ${quantity} books to cart` });
      } else {
        // Nếu chưa có thì tạo mới cart item
        const newCartItem = {
          idBookSupplier: bookSupplier.id,
          idCart,
          quantity,
        };
        await CartItemModel.addCartItem(newCartItem);
        res.json({ message: `Added ${quantity} books to cart` });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async Update(req, res) {
    const { cartItemId } = req.params;
    const { quantity } = req.body;
    try {
      const success = await CartItemModel.updateCartItemQuantity(
        cartItemId,
        quantity
      );
      if (success) {
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }

  async Delete(req, res) {
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
      res.status(500).send("Server Error");
    }
  }
  async ShowAll(req, res) {
    try {
      const decoded = jwt.verify(req.cookies.token, "mk");

      const cart = await CartModel.getCartByAccountId(decoded.id);
      const cartId = cart[0].id;
      const cartItems = await CartItemModel.getCartItemsByCartId(cartId);
      res.json(cartItems);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new CartItemController();
