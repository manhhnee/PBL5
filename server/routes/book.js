const express = require("express");
var router = express.Router();
var bookController = require("../controllers/book");
var upload = require("../config/uploadImage/BookImage");

// router.get('/URL',itemsController.method)

router.post("/add", upload.single("Image"), bookController.add);
router.get("/", bookController.showAll);
router.get("/detail/:id", bookController.showOne);
router.delete("/delete/:id", bookController.delete);
router.put("/update/:id", bookController.update);

module.exports = router;
