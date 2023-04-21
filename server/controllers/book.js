const bookModel = require("../models/book");
class bookController {
  add(req, res, next) {
    console.log(req.body);
    bookModel.add(req.body, function (data) {
      res.json(data);
    });
  }
  showAll(req, res, next) {
    const { search = ' ', category = '', minPrice = '', maxPrice = '',author='', limit = 10, page = 1 } = req.query;
    var filter = {search,category,minPrice,maxPrice,author,limit,page}
    bookModel.find(filter, function (data) {
      res.json(data);
    });
  }
  showOne(req, res, next) {
    console.log(req.params.id);
    bookModel.find({ id: req.params.id }, function (data) {
      res.json(data);
    });
  }
  delete(req, res, next) {
    bookModel.delete(req.params.id, function (data) {
      res.json(data);
    });
  }
  update(req, res, next) {
    bookModel.update(req.params.id, req.body, function (data) {
      res.json(data);
    });
  }
}
module.exports = new bookController();
