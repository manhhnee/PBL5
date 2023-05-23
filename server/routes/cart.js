const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cart');
const CartItemController = require('../controllers/cart_item');
var AuthController = require("../controllers/auth");


// Cart item


// Route to update an existing cart item's quantity
router.patch('/:cartItemId', CartItemController.Update);

// Route to delete a cart item
router.delete('/:cartItemId', CartItemController.Delete);

router.post('/add',AuthController.verifyToken, CartController.add);

router.get('/items',AuthController.verifyToken, CartController.showAll);



// Cart
// API endpoint để lấy thông tin cart và cart item cho một account id
// router.get('/', CartController.getCartByAccountId);

module.exports = router;
