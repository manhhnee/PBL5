const express = require("express");
var router = express.Router();
var CategoryController = require("../controllers/category");
const AuthController = require("../controllers/auth");
// router.get('/URL',itemsController.method)

router.post(
  "/add",
  AuthController.verifyToken,
  AuthController.isAdmin,
  CategoryController.add
);
router.get("/", CategoryController.showAll);
router.delete(
  "/delete/:id",
  AuthController.verifyToken,
  AuthController.isAdmin,
  CategoryController.delete
);
router.put(
  "/update/:id",
  AuthController.verifyToken,
  AuthController.isAdmin,
  CategoryController.update
);

module.exports = router;
