const express = require("express");
var router = express.Router();
var bookSupplierController = require("../controllers/book_supplier");

router.post("/add",bookSupplierController.add);


module.exports = router;
