const CartModel = require("../models/cart");
const jwt = require("jsonwebtoken");

class CartController {
  showAll(req, res, next) {
    CartModel.getCartDetailsbyIdAccount(req.user.id, function (data) {
      res.json(data);
    });
  }
  add(req, res, next) {
    CartModel.addItemIntoCart(req.user.id, req.body, function (data) {
      res.json(data);
    });
  }
  updateQuantity(req, res, next) {
    CartModel.updateQuantityCartItems(
      req.user.id,
      req.params.idCartItem,
      req.body.quantity,
      function (data) {
        res.json(data);
      }
    );
  }
  delete(req, res, next) {
    CartModel.deleteCartItems(
      req.user.id,
      req.params.idCartItem,
      function (data) {
        res.json(data);
      }
    );
  }
}

module.exports = new CartController();
