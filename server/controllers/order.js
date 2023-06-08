const OrderModel = require("../models/order");
class OrderController {
  OrderAll(req, res, next) {
    OrderModel.CreateOrderAllCart(
      req.user.id,
      req.body.OrderItems,
      req.body.address,
      req.body.payment,
      function (data) {
        res.json(data);
      }
    );
  }
  Order(req, res, next) {
    OrderModel.CreateOrder(
      req.user.id,
      req.body,
      req.body.address,
      req.body.payment,
      function (data) {
        res.json(data);
      }
    );
  }
  showDetail(req, res, next) {
    OrderModel.GetOrderDetailsbyOrderId(req.params.id, function (data) {
      res.json(data);
    });
  }
  showHistoryOrderList(req, res, next) {
    OrderModel.getHistoryOrderList(req.user.id, function (data) {
      res.json(data);
    });
  }
  showHistoryStatusOrderList(req, res, next) {
    OrderModel.getHistoryStatusOrderList(
      req.user.id,
      req.params.id_status,
      function (data) {
        res.json(data);
      }
    );
  }
  showOrderList(req, res, next) {
    OrderModel.getOrderList(function (data) {
      res.json(data);
    });
  }
  showStatusOrders(req, res, next) {
    OrderModel.getStatusOrder(req.params.id_status, function (data) {
      res.json(data);
    });
  }
  changeStatusOrders(req, res, next) {
    OrderModel.changeStatus(req.params.id, function (data) {
      res.json(data);
    });
  }
  cancelOrder(req, res, next) {
    OrderModel.cancelOrder(req.params.id, function (data) {
      res.json(data);
    });
  }
  revenue(req, res, next) {
    OrderModel.Revenue(req.query, function (data) {
      res.json(data);
    });
  }
  revenueOfYear(req, res, next) {
    OrderModel.RevenueOfYear(function (data) {
      res.json(data);
    });
  }
}
module.exports = new OrderController();
