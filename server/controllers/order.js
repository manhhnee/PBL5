const OrderModel = require("../models/order");
class OrderController {
    add(req, res, next) {
        OrderModel.CreateOrderWithItems(req.body.orderItems, req.user.id, req.body.address, function (data) {
            res.json(data);
        });
    }
    showDetail(req, res, next) {
        OrderModel.GetOrderDetailsbyOrderId(req.params.id, function (data) {
            res.json(data)
        })
    }
    showHistoryOrderList(req,res,next){
        OrderModel.getHistoryOrderList(req.user.id,function (data) {
            res.json(data)
        })
    }
    showPendingOrders(req,res,next){
        OrderModel.getPending(function(data) {
            res.json(data)
        })
    }
    showDeliveringOrders(req,res,next){
        OrderModel.getDelivering(function(data) {
            res.json(data)
        })
    }
    showSuccessOrders(req,res,next){
        OrderModel.getSuccess(function(data) {
            res.json(data)
        })
    }
    showCanceledOrders(req,res,next){
        OrderModel.getCanceled(function(data) {
            res.json(data)
        })
    }
    changeStatusOrders(req,res,next){
        OrderModel.changeStatus(req.params.id,function(data){
            res.json(data)
        })
    }
    cancelOrder(req,res,next){
        OrderModel.cancelOrder(req.params.id,function(data){
            res.json(data)
        })
    }
}


module.exports = new OrderController();