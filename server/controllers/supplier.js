const supplierModel = require("../models/supplier");
class supplierController {
  add(req, res, next) {
    supplierModel.add(req.body, function (data) {
      res.json(data);
    });
  }
  showAll(req, res, next) {
    supplierModel.find({}, function (data) {
      res.json(data);
    });
  }
  showOne(req, res, next) {
    supplierModel.find({ id: req.params.id }, function (data) {
      res.json(data);
    });
  }
  delete(req, res, next) {
    supplierModel.delete(req.params.id, function (data) {
      res.json(data);
    });
  }
  update(req, res, next) {
    supplierModel.update(req.params.id, req.body, function (data) {
      res.json(data);
    });
  }
}
module.exports = new supplierController();
