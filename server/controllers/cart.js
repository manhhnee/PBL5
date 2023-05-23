const CartModel = require('../models/cart')
const jwt = require('jsonwebtoken')

class CartController {
  showAll(req,res,next){
    CartModel.getCartDetailsbyIdAccount(req.user.id,function(data){
      res.json(data)
    })
  }
  add(req,res,next){
    CartModel.addItemIntoCart(req.user.id,req.body,function(data){
      console.log(req.body)
      res.json(data)
    })
  }
}

module.exports = new CartController()
