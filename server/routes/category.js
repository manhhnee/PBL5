const express = require("express");
var router = express.Router();
var CategoryController = require("../controllers/category");

// router.get('/URL',itemsController.method)

router.post("/add", CategoryController.add);
router.get("/", CategoryController.showAll);
router.delete("/delete/:id", CategoryController.delete);
router.put("/update/:id", CategoryController.update);

module.exports = router;
