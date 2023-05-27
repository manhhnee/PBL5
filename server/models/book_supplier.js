const db = require("../config/db/index");

const book_supplier = function (book_supplier)   {
    (this.id = book_supplier.id),
    (this.id_Book = book_supplier.id_Book),   
    (this.id_Supplier = book_supplier.id_Supplier),
    (this.Import_Price = book_supplier.Import_Price),
    (this.Amount = book_supplier.Amount)
}
      
book_supplier.add = function(data,results){
    db.query("SELECT * FROM book_supplier WHERE id_Book = ? AND id_Supplier = ? AND Import_Price = ?",
    [data.id_Book,data.id_Supplier,data.Import_Price],(err,book_suppliers)=>{
        if(err) return err
        //kiem tra neu da ton tai mat hang nay cung gia nhap r thi them vao chu ko tao moi
        if(book_suppliers.length > 0){
            db.query("UPDATE book_supplier SET Amount = ? WHERE id = ?",
            [parseInt(book_suppliers[0].Amount)+parseInt(data.Amount),book_suppliers[0].id],(err,book_supplier)=>{
                if(err) return err
                else return results({success:true,message:"update số lượng sản phẩm thành công"})
            })
        }
        else {
            db.query("INSERT INTO book_supplier (id_Book, id_Supplier, Import_Price, Amount) VALUES (?, ?, ?, ?)",
            [data.id_Book,data.id_Supplier,data.Import_Price,data.Amount],(err,bookSupplier)=>{   
                if(err) return err
                else return results({success:true,message:"thêm thành công"})
            })
        }
    })
    
}



module.exports = book;