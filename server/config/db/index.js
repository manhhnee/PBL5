var mysql = require("mysql");
var connecttion = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "",
  database: "pbl5",
});
connecttion.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("connect success");
  }
});
module.exports = connecttion;
