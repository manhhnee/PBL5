const InforUserModel = require('../models/inforUser');
class InforUserController{
    getInforUser(req,res,next){
        InforUserModel.findWithAccountId(req.user.id,function(data){
            res.json({user:data,role:req.user.role,success:true})
        })
    }
    FindInforUser(req,res,next){
        InforUserModel.findWithAccountId(req.params.id,function(data){
            res.json(data)
        })
    }
}
module.exports = new InforUserController();