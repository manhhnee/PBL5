const express = require("express");
var router = express.Router();
var AuthController = require("../controllers/auth");
var InforUserController = require("../controllers/inforUser");
var upload = require("../config/uploadImage/Avatar")
// router.get('/URL',itemsController.method)

router.get(
  "/profile",
  AuthController.verifyToken,
  AuthController.isCustomer,
  InforUserController.getInforUser
);
router.get(
  "/staff",
  AuthController.verifyToken,
  AuthController.isStaff,
  InforUserController.getInforUser
);
router.get("/:id", InforUserController.FindInforUser);

router.put("/edit",
AuthController.verifyToken,
AuthController.isCustomer,
upload.single('Avatar'),
InforUserController.update
);

module.exports = router;
