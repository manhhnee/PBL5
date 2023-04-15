const categoriesModel = require('../models/category');
class CategoryController{
    add(req,res,next){
        console.log(req.body)
        categoriesModel.add(req.body,function(data){
            res.json(data)
        })
    }
    showAll(req,res,next){
        console.log('hehe')
        categoriesModel.find({},function(data){
            res.json(data)
        })
    }
    delete(req,res,next){
        
        categoriesModel.delete(req.params.id,function(data){
            res.json(data)
        })
    }
    update(req,res,next){
        categoriesModel.update(req.params.id,req.body,function(data){
            res.json(data)
        })
    }
    
}
module.exports = new CategoryController();