const CartItemModel = require('../models/cart_item')
const BookSupplierModel = require('../models/book_supplier')
const CartModel = require('../models/cart')
const jwt = require('jsonwebtoken')

class CartItemController {
  async Add(req, res){
    try {
      // Lấy id_Book từ URL
      const { id_Book } = req.params;
  
      // Lấy thông tin về BookSupplier từ database dựa trên id_Book
      const bookSupplier = await BookSupplierModel.getBookSupplierByBookId(id_Book);
      const { id: id_BookSupplier } = bookSupplier[0];
  
      // Lấy thông tin về tài khoản từ token được gửi trong header
      const decoded = jwt.verify(req.cookies.token, 'mk');
  
      // Lấy thông tin giỏ hàng của tài khoản đó từ database
      const cart = await CartModel.getCartByAccountId(decoded.id);
      const cartId = cart[0].id;
  
      // Kiểm tra xem Cart Item đã tồn tại trong giỏ hàng chưa
      const existingCartItem = await CartItemModel.getCartItemByCartIdAndBookSupplierId(cartId, id_BookSupplier);
  
      if (existingCartItem.length > 0) {
        // Nếu Cart Item đã tồn tại, cập nhật số lượng
        const newQuantity = existingCartItem[0].quantity + parseInt(req.body.quantity);
        await CartItemModel.updateCartItem(existingCartItem[0].id, newQuantity);
      } else {
        // Nếu Cart Item chưa tồn tại, tạo mới
        await CartItemModel.createCartItem(cartId, id_BookSupplier, req.body.quantity);
      }
      res.json({ message: 'Thêm Cart Item vào giỏ hàng thành công' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lỗi server' });
    }
  };

  async Update (req, res) {
    const { cartItemId } = req.params
    const { quantity } = req.body
    try {
      const success = await CartItemModel.updateCartItemQuantity(
        cartItemId,
        quantity
      )
      if (success) {
        res.sendStatus(204)
      } else {
        res.sendStatus(404)
      }
    } catch (err) {
      console.error(err)
      res.status(500).send('Server Error')
    }
  }

  async Delete (req, res) {
    const { cartItemId } = req.params
    try {
      const success = await CartItemModel.deleteCartItem(cartItemId)
      if (success) {
        res.sendStatus(204)
      } else {
        res.sendStatus(404)
      }
    } catch (err) {
      console.error(err)
      res.status(500).send('Server Error')
    }
  }
  async ShowAll (req, res) {
    try {
      const decoded = jwt.verify(req.cookies.token, 'mk')

      const cart = await CartModel.getCartByAccountId(decoded.id)
      const cartId = cart[0].id
      const cartItems = await CartItemModel.getCartItemsByCartId(cartId)
      res.json(cartItems)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}

module.exports = new CartItemController()
