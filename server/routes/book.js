const express = require("express");
var router = express.Router();
var bookController = require("../controllers/book");

// router.get('/URL',itemsController.method)

router.post("/add", bookController.add);
router.get("/book", bookController.showAll);
router.get("/detail/:id", bookController.showOne);
router.delete("/delete/:id", bookController.delete);
router.put("/update/:id", bookController.update);

module.exports = router;
