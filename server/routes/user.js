const express = require("express");
var router = express.Router();
var AuthController = require("../controllers/auth");
var InforUserController = require("../controllers/inforUser");
var upload = require("../config/uploadImage/Avatar");
// router.get('/URL',itemsController.method)
router.get(
  "/staffList",
  AuthController.verifyToken,
  AuthController.isAdmin,
  InforUserController.getListStaff
);
router.delete(
  "/deleteStaff/:idAccount",
  AuthController.verifyToken,
  AuthController.isAdmin,
  InforUserController.deleteStaff)
  router.post(
    "/addStaff",
    AuthController.verifyToken,
    AuthController.isAdmin,
    upload.single('Avatar'),
    InforUserController.addStaff
  )
  router.put(
    "/updateStaff/:id_Account",
    AuthController.verifyToken,
    AuthController.isAdmin,
    upload.single("Avatar"),
    InforUserController.updateStaff
  );
  ////////////////////////////////////////////////////////////////////////
router.get(
  "/profile/customer",
  AuthController.verifyToken,
  AuthController.isCustomer,
  InforUserController.getInforUser
);
router.get(
  "/profile/staff",
  AuthController.verifyToken,
  AuthController.isStaff,
  InforUserController.getInforUser
);
router.get(
  "/profile/admin",
  AuthController.verifyToken,
  AuthController.isAdmin,
  InforUserController.getInforUser
);
router.get("/:id", InforUserController.FindInforUser);

router.put(
  "/edit",
  AuthController.verifyToken,
  AuthController.isCustomer,
  upload.single("Avatar"),
  InforUserController.update
);


module.exports = router;
