
const accountRoute = require("./account");
const UserRoute = require("./user");
const CategoryRoute = require("./category");
const BookRoute = require("./book");
const ImageBookRoute = require("./imageBook");
const RatingRoute = require("./rating");
const SupplierRoute = require('./supplier');
function route(app) {
  app.use("/api/user", UserRoute);
  app.use("/api/account", accountRoute);
  app.use("/api/category", CategoryRoute);
  app.use("/api/book", BookRoute);
  app.use("/api/image", ImageBookRoute);
  app.use("/api/rating", RatingRoute);
   app.use('/supplier',SupplierRoute);
}
module.exports = route;
