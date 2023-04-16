const accountRoute = require("./account");
const UserRoute = require("./user");
function route(app) {
  app.use("/user", UserRoute);
  app.use("/api", accountRoute);
}

module.exports = route;
