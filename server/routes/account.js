const express = require('express') 
const AccountController = require('../controllers/account')
var router = express.Router()
// var AuthController = require('../controllers/auth')


// router.get('/URL',itemsController.method)


 router.post('/register',AccountController.register)
 router.post('/login',AccountController.login)
//  router.get('/private',AuthController.verifyToken,AuthController.isCustomer,AccountController.getAccount)

module.exports = router