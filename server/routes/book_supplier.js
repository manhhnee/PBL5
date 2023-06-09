const express = require("express");
var router = express.Router();
var bookSupplierController = require("../controllers/book_supplier");
const AuthController = require("../controllers/auth");

router.post(
  "/add",
  AuthController.verifyToken,
  AuthController.isAdmin,
  bookSupplierController.add
);
router.delete(
  "/delete/:id_BookSupplier",
  AuthController.verifyToken,
  AuthController.isAdmin,
  bookSupplierController.delete
);
router.get(
  "/show",
  AuthController.verifyToken,
  AuthController.isAdmin,
  bookSupplierController.show
);

module.exports = router;
