const ratingModel = require("../models/rating");
function sumArray(mang) {
  let sum = 0;
  for (let i = 0; i < mang.length; i++) {
    sum += mang[i].star;
  }

  return sum;
}
class ratingController {
  add(req, res, next) {
    console.log(req.body);
    ratingModel.add(req.body, req.user.id, function (data) {
      res.json(data);
    });
  }
  show(req, res, next) {
    ratingModel.find({ idBook: req.params.idBook }, function (data) {
      // id là id của sách
      var stars = Math.round(sumArray(data) / data.length);
      if (isNaN(stars)) stars = 0;
      res.json({ stars: stars });
    });
  }
  showOne(req, res, next) {
    ratingModel.find({ idBook: req.params.idBook }, function (data) {
      res.json(data);
    });
  }
  delete(req, res, next) {
    ratingModel.delete(req.params.id, function (data) {
      res.json(data);
    });
  }
  update(req, res, next) {
    ratingModel.update(req.params.id, req.body, function (data) {
      res.json(data);
    });
  }
}
module.exports = new ratingController();
