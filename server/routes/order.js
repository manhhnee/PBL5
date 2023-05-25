const express = require("express");
var router = express.Router();
var AuthController = require("../controllers/auth");
var OrderController = require("../controllers/order");

// router.get('/URL',itemsController.method)

router.post("/add", AuthController.verifyToken, OrderController.OrderAll);
router.post("/addOneItem", AuthController.verifyToken, OrderController.Order);
router.get("/detail/:id", AuthController.verifyToken, OrderController.showDetail);
router.get("/history", AuthController.verifyToken, OrderController.showHistoryOrderList);
router.get("/pending", AuthController.verifyToken, OrderController.showPendingOrders);
router.get("/delivering", AuthController.verifyToken, OrderController.showDeliveringOrders);
router.get("/success", AuthController.verifyToken, OrderController.showSuccessOrders);
router.get("/canceled", AuthController.verifyToken, OrderController.showCanceledOrders);
router.put("/changeStatus/:id", AuthController.verifyToken, OrderController.changeStatusOrders);
router.put("/cancel/:id", AuthController.verifyToken, OrderController.cancelOrder);

module.exports = router;
