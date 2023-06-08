const express = require("express");
var router = express.Router();
const paymentController = require('../controllers/payment')

router.get('/config', paymentController.getConfig)


module.exports = router;
