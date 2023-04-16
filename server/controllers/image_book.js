const imageBookModel = require('../models/image_book');
class imageBookController{
    add(req,res,next){
        console.log(req.body)
        imageBookModel.add(req.body,function(data){
            res.json(data)
        })
    }
    show(req,res,next){
        imageBookModel.find({idBook:req.params.idBook},function(data){      // id là id của sách
            res.json(data)
        })
    }
    delete(req,res,next){
        
        imageBookModel.delete(req.params.id,function(data){
            res.json(data)
        })
    }
    
}
module.exports = new imageBookController();