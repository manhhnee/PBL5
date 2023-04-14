var mysql = require('mysql')
var connecttion = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'pbl5',
})
connecttion.connect(function(err){
    if(err){
        throw err
    }
    else{
        console.log('connect success')
    }
})
module.exports = connecttion 