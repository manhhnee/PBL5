const express = require("express");
var router = express.Router();
var AuthController = require("../controllers/auth");
var InforUserController = require("../controllers/inforUser");

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

<<<<<<< HEAD
module.exports = router;
=======

 router.get('/profile',AuthController.verifyToken,AuthController.isCustomer,InforUserController.getInforUser)
 router.get('/staff',AuthController.verifyToken,AuthController.isStaff,InforUserController.getInforUser)
 router.get('/:id',InforUserController.FindInforUser)

module.exports = router
>>>>>>> master
