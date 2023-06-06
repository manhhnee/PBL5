const express = require('express') 
var router = express.Router()
const messageController = require("../controllers/message");
const authController = require("../controllers/auth");

router.post("/add", authController.verifyToken, messageController.add);
router.get("/:idAccount", authController.verifyToken, messageController.show);
router.get("/:idBook", messageController.showOne);
router.delete("/delete/:id", messageController.delete);
router.put("/update/:id", messageController.update);

module.exports = router;