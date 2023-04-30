const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const CartController = require('../controllers/cart');

// API endpoint để lấy thông tin cart và cart item cho một account id
router.get('/', CartController.getCartByAccountId);

module.exports = router;
