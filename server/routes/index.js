const accountRoute = require("./account");
const UserRoute = require("./user");
const CategoryRoute = require("./category");
const BookRoute = require("./book");
const ImageBookRoute = require("./imageBook");
const RatingRoute = require("./rating");
const SupplierRoute = require("./supplier");
const CartRoute = require("./cart");
const OrderRoute = require("./order");
function route(app) {
  app.use("/api/user", UserRoute);
  app.use("/api/account", accountRoute);
  app.use("/api/category", CategoryRoute);
  app.use("/api/book", BookRoute);
  app.use("/api/image", ImageBookRoute);
  app.use("/api/rating", RatingRoute);
  app.use("/api/supplier", SupplierRoute);
  app.use("/api/cart", CartRoute);
  app.use("/api/order", OrderRoute);
}
module.exports = route;
