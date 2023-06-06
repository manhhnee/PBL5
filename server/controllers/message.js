const socketIO = require('socket.io');
const MessagseModel = require('../models/message');
class MessagseController{
    show(req,res,next){
        MessagseModel.findWithAccountId(req.user.id,function(data){
            res.json({user:data,role:req.user.role,success:true})
        })
    }
    showOne(req,res,next){
        MessagseModel.findWithMessageId(req.params.id,function(data){
            res.json(data)
        })
    }
    add(req,res,next){
        const id_Account = req.user.id;
        const message = req.body;
        MessagseModel.add(id_Account, message, function(data){
            res.json(data)
        })
    }

    update(req,res,next){
        const id_Message = req.params.id
        const message = req.body
        MessagseModel.update(id_Message, message, function(data){
            res.json(data)
        })
    }

    delete(req,res,next){
        const id_Message = req.params.id
        MessagseModel.delete(id_Message, function(data){
            res.json(data)
        })
    }

    initSocket(io) {
        io.on('connection', (socket) => {
          console.log('New client connected');
    
          socket.on('message', (userMessage) => {
            this.handleSocketMessage(socket, userMessage);
          });
    
          socket.on('disconnect', () => {
            console.log('Client disconnected');
          });
        });
      }
}   
module.exports = new MessagseController();