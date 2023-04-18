const express = require('express') 
var router = express.Router()
var AuthController = require('../controllers/auth')
var InforUserController = require('../controllers/inforUser')


// router.get('/URL',itemsController.method)



 router.get('/profile',AuthController.verifyToken,AuthController.isCustomer,InforUserController.getInforUser)
 router.get('/:id',InforUserController.FindInforUser)

module.exports = router