const express = require("express");
const AccountController = require("../controllers/account");
const AuthController = require("../controllers/auth");
var router = express.Router();

// router.get('/URL',itemsController.method)

router.post("/register", AccountController.register);
router.post("/login", AccountController.login);
router.put("/changePass",AuthController.verifyToken,AccountController.changePassword)
//  router.get('/private',AuthController.verifyToken,AuthController.isCustomer,AccountController.getAccount)

module.exports = router;
