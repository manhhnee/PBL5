const accountModel = require('../models/account');

class AccountController{
    
    register(req,res,next){
        accountModel.register( req.body,function(data){
            res.status(210).json(data)
        })
    }   
    login(req,res,next){
        accountModel.login(req.body,function(data){
            
            res.json(data)
        })
    }
    getAccount(req,res,next){
        accountModel.find(req.user.id,function(data){
            res.json({user:data,role:req.user.role,success:true})
        })
    }
    changePassword(req,res,next){
        accountModel.changePassWord(req.user.id,req.body,function(data){
            res.json(data)
        })
    }
}
module.exports = new AccountController();