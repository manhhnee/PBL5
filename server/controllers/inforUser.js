const inforUser = require('../models/inforUser');
const InforUserModel = require('../models/inforUser');
class InforUserController{
    getInforUser(req,res,next){
        InforUserModel.findWithAccountId(req.user.id,function(data){
            res.json({user:data,role:req.user.role,success:true})
        })
    }
    getListStaff(req,res,next){
        
        InforUserModel.getListStaff(function(data){
            res.json(data)
        })
    }
    FindInforUser(req,res,next){
        InforUserModel.findWithAccountId(req.params.id,function(data){
            res.json(data)
        })
    }
    update(req,res,next){
        const id_Account = req.user.id
        const avatarPath = req.file ? `http://localhost:5000/${req.file.path}` : null;
        const data = req.body
        InforUserModel.update(id_Account, avatarPath,data,function(data){
            res.json(data)
        })
    }
    
}   
module.exports = new InforUserController();