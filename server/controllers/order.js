const OrderModel = require("../models/order");
class OrderController {
    OrderAll(req, res, next) {
        OrderModel.CreateOrderAllCart(req.user.id,req.body.address, function (data) {
            res.json(data)
        })
    }
    Order(req,res,next){
        OrderModel.CreateOrder(req.user.id,req.body,req.body.address, function (data){
            res.json(data)
        })
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
    showHistorySuccessOrderList(req,res,next){
        OrderModel.getHistorySuccessOrderList(req.user.id,function (data) {
            res.json(data)
        })
    }
    showHistoryPendingOrderList(req,res,next){
        OrderModel.getHistoryPendingOrderList(req.user.id,function (data) {
            res.json(data)
        })
    }
    showHistoryDeliveringOrderList(req,res,next){
        OrderModel.getHistoryDeliveringOrderList(req.user.id,function (data) {
            res.json(data)
        })
    }
    showHistoryCanceledOrderList(req,res,next){
        OrderModel.getHistoryCancelOrderList(req.user.id,function (data) {
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
    revenue(req,res,next){
        OrderModel.Revenue(req.body,function(data){
            res.json(data)
        })
    }
}


module.exports = new OrderController();