const express = require("express");
var router = express.Router();
var ratingController = require("../controllers/rating");

// router.get('/URL',itemsController.method)

router.post("/add", ratingController.add);
router.get("/totalstar/:idBook", ratingController.show);
router.get("/detail/:idBook/", ratingController.showOne);
router.delete("/delete/:id", ratingController.delete);
router.put("/update/:id", ratingController.update);

module.exports = router;
