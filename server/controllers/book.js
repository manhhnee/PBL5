const bookModel = require("../models/book");
class bookController {
  add(req, res, next) {
    const BookPath = req.file
      ? `https://pbl5-server-shpk.onrender.com/${req.file.path}`
      : null;
    bookModel.add(req.body, BookPath, function (data) {
      res.json(data);
    });
  }
  showAll(req, res, next) {
    const {
      search = " ",
      category = "",
      minPrice = "",
      maxPrice = "",
      author = "",
      limit = 10,
      page = 1,
      DESC_Price = false,
    } = req.query;
    var filter = {
      search,
      category,
      minPrice,
      maxPrice,
      author,
      limit,
      page,
      DESC_Price,
    };
    bookModel.find(filter, function (data) {
      res.json(data);
    });
  }
  showOne(req, res, next) {
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
