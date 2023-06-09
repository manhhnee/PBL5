const express = require("express");
var router = express.Router();
var bookController = require("../controllers/book");
var upload = require("../config/uploadImage/BookImage");
const AuthController = require("../controllers/auth");

// router.get('/URL',itemsController.method)

router.post(
  "/add",
  AuthController.verifyToken,
  AuthController.isAdmin,
  upload.single("Image"),
  bookController.add
);
router.get("/", bookController.showAll);
router.get("/detail/:id", bookController.showOne);
router.delete(
  "/delete/:id",
  AuthController.verifyToken,
  AuthController.isAdmin,
  bookController.delete
);
router.put(
  "/update/:id",
  AuthController.verifyToken,
  AuthController.isAdmin,
  bookController.update
);

module.exports = router;
