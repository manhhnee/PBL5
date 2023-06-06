const db = require("../config/db/index");

const messages = function(messages){
    this.id = messages.id,
    this.message = messages.message,
    this.id_Account = messages.id_Account
}

messages.findWithAccountId = function(idAccount,results){
    db.query(`SELECT message.*, account.Username, 
              FROM message
              JOIN account ON message.id_Account = account.id 
              WHERE message.id_Account = ?`,idAccount,(err,infor)=>{
        if(err) throw err;
        results(infor[0]);
    })
}

messages.findWithMessageId = function(idMessage,results){
    db.query(`SELECT * FROM message WHERE id =?`,idMessage,(err,message)=>{
        if(err) throw err;
        results(message[0]);
    })
}

messages.add = function (idAccount,message, results) {
    db.query("INSERT INTO message (id_Account, message) VALUES (?, ?)",
    [idAccount,message], function (err, images) {
        if (err) return err
        else {
            results({ success: true, message: 'thêm thành công' })
        }
    })
}

messages.update = function (idMessage, data, results) {
    db.query(
      "UPDATE message SET message =? WHERE id =?",
      [data.message, idMessage],
      function (err, messages) {
        if (err) console.log(err.message);
        else {
          results({ success: true, message: "cập nhật thành công" });
        }
      }
    );
  };

messages.delete = function (idMessage, results) {
    db.query(
      "DELETE FROM message WHERE id =?",
      idMessage,
      function (err, messages) {
        if (err) return err;
        else {
          results({ success: true, message: "xóa thành công" });
        }
      }
    );
  };

module.exports = messages;