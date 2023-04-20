const express = require("express");
var router = express.Router();
var imageBookController = require("../controllers/image_book");

// router.get('/URL',itemsController.method)

router.post("/add", imageBookController.add);
router.get("/image/:idBook", imageBookController.show);
router.delete("/delete/:id", imageBookController.delete);

module.exports = router;
