const express = require('express') 
const AccountController = require('../controllers/account')
var router = express.Router()
// var AuthController = require('../controllers/auth')


// router.get('/URL',itemsController.method)


 router.post('/register',AccountController.register)
 router.post('/login',AccountController.login)
 router.post('/',(req,res,next) => {console.log(req.body.name);res.json(req.body.name)})
//  router.get('/private',AuthController.verifyToken,AuthController.isCustomer,AccountController.getAccount)

module.exports = router