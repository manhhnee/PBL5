const express = require('express') 
var router = express.Router()
var ratingController = require('../controllers/rating')


// router.get('/URL',itemsController.method)



 router.post('/add',ratingController.add)
 router.get('/show/:idBook',ratingController.show)
 router.get('/show/detail/:idBook/',ratingController.showOne)
 router.delete('/delete/:id',ratingController.delete)
 router.put('/update/:id',ratingController.update)


module.exports = router