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
        const offset = (data.page - 1) * data.limit;
       
        let query = `SELECT b.id, b.id_Category, b.Name, b.Author, b.Price, b.Description, i.Image  
            FROM book b LEFT JOIN ( SELECT id_Book, MIN(id) AS min_id FROM image_book GROUP BY id_Book ) m 
            ON b.id = m.id_Book LEFT JOIN image_book i ON m.min_id = i.id 
            WHERE Name LIKE '%${data.search}%'`
        if (data.category) {
            query += ` AND id_Category = ${data.category}`;        
        }
        if (data.minPrice) {
            query += ` AND Price >= ${data.minPrice}`;
        }      
        if (data.maxPrice) {
            query += ` AND Price <= ${data.maxPrice}`;
        }
        if (data.author) {
            query += ` AND Author = ${data.author}`;        
        }
        query += ` ORDER BY b.id DESC LIMIT ${data.limit} OFFSET ${offset}`
        console.log(query);
        db.query(query, function(err,books){
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
