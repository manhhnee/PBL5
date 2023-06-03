const express = require("express");
var router = express.Router();
var AuthController = require("../controllers/auth");
var OrderController = require("../controllers/order");

// router.get('/URL',itemsController.method)

router.post("/add", AuthController.verifyToken, OrderController.OrderAll);
router.post("/addOneItem", AuthController.verifyToken, OrderController.Order);
router.get("/detail/:id", AuthController.verifyToken, OrderController.showDetail);
router.get("/history", AuthController.verifyToken, OrderController.showHistoryOrderList);
router.get("/history/:id_status", AuthController.verifyToken, OrderController.showHistoryStatusOrderList);
router.get("/revenue", AuthController.verifyToken, OrderController.revenue);
router.get("/orderList", OrderController.showOrderList);
router.get("/:id_status", AuthController.verifyToken, OrderController.showStatusOrders);
router.put("/changeStatus/:id", AuthController.verifyToken, OrderController.changeStatusOrders);
router.put("/cancel/:id", AuthController.verifyToken, OrderController.cancelOrder);

module.exports = router;
