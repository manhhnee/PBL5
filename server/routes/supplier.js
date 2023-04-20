const express = require('express') 
var router = express.Router()
var supplierController = require('../controllers/supplier')


// router.get('/URL',itemsController.method)



 router.post('/add',supplierController.add)
 router.get('/show',supplierController.showAll)
 router.get('/detail/:id',supplierController.showOne)
 router.delete('/delete/:id',supplierController.delete)
 router.put('/update/:id',supplierController.update)

module.exports = router