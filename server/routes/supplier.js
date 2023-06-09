const express = require("express");
var router = express.Router();
var supplierController = require("../controllers/supplier");
var authController = require("../controllers/auth");

// router.get('/URL',itemsController.method)

router.post(
  "/add",
  authController.verifyToken,
  authController.isAdmin,
  supplierController.add
);
router.get("/show", supplierController.showAll);
router.get("/detail/:id", supplierController.showOne);
router.delete(
  "/delete/:id",
  authController.verifyToken,
  authController.isAdmin,
  supplierController.delete
);
router.put(
  "/update/:id",
  authController.verifyToken,
  authController.isAdmin,
  supplierController.update
);

module.exports = router;
