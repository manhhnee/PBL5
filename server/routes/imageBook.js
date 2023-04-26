const express = require("express");
var router = express.Router();
var imageBookController = require("../controllers/image_book");
var upload = require("../config/uploadImage/BookImage")

// router.get('/URL',itemsController.method)

router.post("/add/:idBook",
    upload.single('Image'),
    imageBookController.add
);
router.get("/:idBook", imageBookController.show);
router.delete("/delete/:id", imageBookController.delete);

module.exports = router;
