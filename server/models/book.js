const db = require('../config/db/index');



const book = function(book){
    this.id = book.id,
    this.id_Category = book.id_Category,
    this.Name = book.Name, 
    this.Price = book.Price,
    this.Author = book.Author,
    this.Description = book.Description
    this.Publication_Date = book.Publication_Date,
    this.Publisher = book.Publisher

}
book.add = function(data,results){
    console.log(data.Author)
    db.query("INSERT INTO book (id_Category, Name, Price, Author, Description,Publication_Date,Publisher) VALUES (?, ?, ?, ?, ?, ?, ?)",
     [data.id_Category,data.Name,data.Price,data.Author,data.Description,data.Publication_Date,data.Publisher], function (err,books) {
        if (err) return err
        else {
            console.log(books)
            results({success: true, message:'thêm thành công'})
        }
    })
}
book.find = function(data,results){
    console.log(data)
    if(!data.id){
        db.query("SELECT * FROM book", function (err,books) {
            if (err) return err
            else {
                results(books)
            }
        })
    }
    else
    {
        db.query("SELECT * FROM book WHERE id = ?",data.id, function (err,books) {
            if (err) return err
            else {
                results(books[0])
            }
        })
    }
}
book.delete = function(idBook,results){
    db.query("DELETE FROM book WHERE id =?",idBook, function (err,books) {
        if (err) return err
        else {
            console.log(books)
            results({success: true, message:'xóa thành công'})
        }
    })
}
book.update = function(idBook, data,results){
    db.query("UPDATE book SET id_Category =?,Name =?,Price =?,Author =?,Description =?,Publication_Date= ?,Publisher=? WHERE id =?",
     [data.id_Category,data.Name,data.Price,data.Author,data.Description,data.Publication_Date,data.Publisher, idBook], function (err,books) {
        if (err) return err
        else {
            results({success: true, message:'cập nhật thành công'})
        }
    })
}
module.exports = book
