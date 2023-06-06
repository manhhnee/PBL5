const express = require("express");
var router = express.Router();
var ratingController = require("../controllers/rating");
var authController = require("../controllers/auth");
// router.get('/URL',itemsController.method)

router.post("/add",authController.verifyToken, ratingController.add);
router.get("/totalstar/:idBook", ratingController.show);
router.get("/detail/:idBook/", ratingController.showOne);
router.delete("/delete/:id",authController.verifyToken, ratingController.delete);
router.put("/update/:id",authController.verifyToken, ratingController.update);

module.exports = router;
