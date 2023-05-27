const bookSupplierModel = require("../models/book_supplier");
class bookSupplierController {
    add(req,res,next){
        bookSupplierModel.add(req.body,function(data){
            res.json(data);
        })
    }
}
module.exports = new bookSupplierController()