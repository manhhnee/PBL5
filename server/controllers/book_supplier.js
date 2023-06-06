const bookSupplierModel = require("../models/book_supplier");
class bookSupplierController {
    add(req,res,next){
        bookSupplierModel.add(req.body,function(data){
            res.json(data);
        })
    }
    delete(req,res,next){
        bookSupplierModel.delete(req.params.id_BookSupplier,function(data){
            res.json(data)
        })
    }
    show(req,res,next){
           bookSupplierModel.show(function(data){
            res.json(data)
           }) 
    }
}
module.exports = new bookSupplierController()