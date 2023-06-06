const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cart');
const CartItemController = require('../controllers/cart_item');


// Cart item

// Route to update an existing cart item's quantity
router.put('/:cartItemId', CartItemController.Update);

// Route to delete a cart item
router.delete('/:cartItemId', CartItemController.Delete);

router.get('/items', CartItemController.ShowAll);

router.post('/:id_Book', CartItemController.Add);



// Cart
// API endpoint để lấy thông tin cart và cart item cho một account id
router.get('/', CartController.getCartByAccountId);

module.exports = router;
