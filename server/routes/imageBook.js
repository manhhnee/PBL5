const express = require("express");
var router = express.Router();
var imageBookController = require("../controllers/image_book");
var upload = require("../config/uploadImage/BookImage");
const AuthController = require("../controllers/auth");
// router.get('/URL',itemsController.method)

router.post(
  "/add/:idBook",
  AuthController.verifyToken,
  AuthController.isAdmin,
  upload.single("Image"),
  imageBookController.add
);
router.get("/:idBook", imageBookController.show);
router.delete(
  "/delete/:id",
  AuthController.verifyToken,
  AuthController.isAdmin,
  imageBookController.delete
);

module.exports = router;
