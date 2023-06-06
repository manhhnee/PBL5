const express = require("express");
var router = express.Router();
var bookSupplierController = require("../controllers/book_supplier");

router.post("/add",bookSupplierController.add);
router.delete("/delete/:id_BookSupplier",bookSupplierController.delete)
router.get('/show',bookSupplierController.show)


module.exports = router;
