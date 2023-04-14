const InforUserModel = require('../models/inforUser');
class InforUserController{
    getInforUser(req,res,next){
        InforUserModel.findWithAccountId(req.user.id,function(data){
            res.json({user:data,role:req.user.role,success:true})
        })
    }
}
module.exports = new InforUserController();