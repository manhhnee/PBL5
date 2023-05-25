const db = require("../config/db/index"); 

const order = function (order) {
    (this.id = rating.id),
    (this.id_Status = rating.id_Status),
    (this.id_Account = rating.id_Account),
    (this.id_Payment = rating.id_Payment),
    (this.OrderDate = rating.OrderDate);
    (this.OrderAddress = rating.OrderAddress);
};
order.CreateOrderAllCart = function(id_Account,address,results){
    var today = new Date()
    db.query("SELECT * FROM cart WHERE id_Account =?",id_Account,function(err,cart){
        if(err) return results({message:err.message})
        else {
          var cartID  = cart[0].id
          const query = `SELECT  ci.id_BookSupplier,ci.quantity,b.Price,bs.Amount            
                          FROM cart_item ci
                          INNER JOIN book_supplier bs ON ci.id_BookSupplier = bs.id
                          INNER JOIN book b ON bs.id_Book = b.id
                          INNER JOIN (
                            SELECT id_Book, Image FROM image_book GROUP BY id_Book
                          ) ib ON b.id = ib.id_Book
                          WHERE ci.id_cart = ?`
          db.query(query,cartID,function(err,orderItems){
            for(var i = 0;i < orderItems.length;i++){
                if(orderItems[i].quantity>orderItems[i].Amount)
                    return results({success:false,message:"số lượng đặt vượt quá sản phẩm trong kho"})
            }
            if(err) return results({success:false,message:err.message})     
            else {
                console.log(orderItems)
                db.query(
                    "INSERT INTO make_order (id_Status,id_Account,id_Payment,OrderDate,OrderAddress) VALUES (?, ?, ?, ?, ?)",
                    [1, id_Account,1,today,address],
                    function(err,order){
                        if(err) return err
                        else {
                            const orderID = order.insertId
                            var totalPrice = 0
                            orderItems.forEach(orderItem=>{
                                totalPrice += orderItem.Price*orderItem.quantity                 
                                db.query(`INSERT INTO order_item (id_Order,id_BookSupplier,quantity,Fixed_Price) VALUES (?, ?, ?, ?)`,
                                    [orderID,orderItem.id_BookSupplier,orderItem.quantity,orderItem.Price*orderItem.quantity]
                                    ,function(err,orderitem){
                                        if(err) return err
                                        else {
                                            db.query("SELECT * FROM book_supplier WHERE id = ?",orderItem.id_BookSupplier,(err,book_supplier)=>{
                                                if(err) return err
                                                else {
                                                    db.query("UPDATE book_supplier SET Amount =? WHERE id = ?",
                                                    [parseInt(book_supplier[0].Amount)-parseInt(orderItem.quantity),book_supplier[0].id],
                                                    (err,book_suppliers)=>{
                                                        if(err) return err
                                                        else {
                                                            db.query("SELECT * FROM cart WHERE id_Account = ?",id_Account,(err,cart)=>{
                                                                if(err) return err
                                                                else {
                                                                    db.query("DELETE FROM cart_item WHERE id_Cart = ?",cart[0].id,(err,cartitem)=>{
                                                                        if(err) return err
                                                                    })
                                                                }
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                            
                                        }
                                    })
                            })
                            db.query(`UPDATE make_order SET totalPrice =? WHERE id =?`,[totalPrice,orderID],
                                function(err,order){
                                    if(err) return err
                                    else return results({success:true,message:"thêm thành công"})
                            })               
                        }
                    }
                )
            }
          })
        }
      })
}
order.CreateOrder = function(id_Account,orderItem,address,results){
    var today = new Date()
    if(orderItem.quantity>orderItem.Amount) return results({success:false,message:"số lượng đặt vượt quá sản phẩm trong kho"})
    else {
        console.log("1")
        db.query(
            "INSERT INTO make_order (id_Status,id_Account,id_Payment,OrderDate,OrderAddress) VALUES (?, ?, ?, ?, ?)",
            [1, id_Account,1,today,address],
            function(err,order){
                if(err) return err
                else {
                    const orderID = order.insertId
                    var totalPrice = 0              
                    totalPrice += orderItem.Price*orderItem.quantity                 
                    db.query(`INSERT INTO order_item (id_Order,id_BookSupplier,quantity,Fixed_Price) VALUES (?, ?, ?, ?)`,
                        [orderID,orderItem.id_BookSupplier,orderItem.quantity,orderItem.Price*orderItem.quantity]
                        ,function(err,orderitem){
                            if(err) return err
                            else {
                                db.query("SELECT * FROM book_supplier WHERE id = ?",orderItem.id_BookSupplier,(err,book_supplier)=>{
                                    if(err) return err
                                    else {
                                        console.log(book_supplier)
                                        db.query("UPDATE book_supplier SET Amount =? WHERE id = ?",
                                        [parseInt(book_supplier[0].Amount)-parseInt(orderItem.quantity),book_supplier[0].id],
                                        (err,book_suppliers)=>{
                                            if(err) return err                                       
                                            })
                                        }
                                })                               
                            }
                    })               
                    db.query(`UPDATE make_order SET totalPrice =? WHERE id =?`,[totalPrice,orderID],
                        function(err,order){
                            if(err) return err
                            else return results({success:true,message:"thêm thành công"})
                    })               
                }
            }
        )
    }
}
order.GetOrderDetailsbyOrderId = function(id_Order,results){
    const query1 = `SELECT mo.*,s.Status,p.Payment_Method 
                FROM make_order mo
                INNER JOIN status s ON mo.id_Status = s.id
                INNER JOIN payment p ON mo.id_Payment = p.id
                WHERE mo.id = ?`

    db.query(query1,[id_Order],
            function(err,orderInfor){
                const query2 = `SELECT oi.id, oi.id_BookSupplier,oi.quantity, oi.Fixed_Price,
                    b.Name, b.Author, b.Price, 
                    bs.Import_Price, 
                    ib.Image, s.Name as Supplier 
                    FROM order_item oi
                    INNER JOIN book_supplier bs ON oi.id_BookSupplier = bs.id
                    INNER JOIN book b ON bs.id_Book = b.id
                    INNER JOIN (
                    SELECT id_Book, Image FROM image_book GROUP BY id_Book
                    ) ib ON b.id = ib.id_Book
                    INNER JOIN supplier s ON bs.id_Supplier = s.id
                    WHERE oi.id_Order = ?`
                db.query(query2,[id_Order],function(err,Order){
                    if(err) return results({message:err.message})
                    else {
                        results({orderInfor:orderInfor[0],orderDetail:Order}) 
                    }  
                })      
    })            
}
order.getHistoryOrderList = function(id_Account,results){
    const query = `SELECT mo.*,s.Status,p.Payment_Method
                    FROM make_order mo
                    INNER JOIN status s ON mo.id_Status = s.id
                    INNER JOIN payment p ON mo.id_Payment = p.id
                    WHERE mo.id_Account = ? 
                    GROUP BY mo.id DESC`
    db.query(query,[id_Account],function(err,Orders){
        results({orderList:Orders})
    })
}
order.getPending = function(results){
    const query = `SELECT mo.*,i.id_Account,i.FirstName,i.LastName,i.PhoneNumber,i.Avatar,i.Address
                    FROM make_order mo
                    INNER JOIN inforuser i ON i.id_Account = mo.id_Account
                    WHERE mo.id_Status = 1 GROUP BY mo.id DESC`
    db.query(query,[],function(err, orders){
        if(err) return err
        else {
            results(orders)
        }
    })
}
order.getDelivering = function(results){
    query = `SELECT mo.*,i.id_Account,i.FirstName,i.LastName,i.PhoneNumber,i.Avatar,i.Address
                FROM make_order mo
                INNER JOIN inforuser i ON i.id_Account = mo.id_Account
                WHERE mo.id_Status = 2 GROUP BY mo.id DESC`
    db.query(query,[],function(err, orders){
        if(err) return err
        else {
            results({orders})
        }
    })
}
order.getSuccess = function(results){
    query = `SELECT mo.*,i.id_Account,i.FirstName,i.LastName,i.PhoneNumber,i.Avatar,i.Address
                FROM make_order mo
                INNER JOIN inforuser i ON i.id_Account = mo.id_Account
                WHERE mo.id_Status = 3 GROUP BY mo.id DESC`
    db.query(query,[],function(err, orders){
        if(err) return err
        else {
            results({orders})
        }
    })
}
order.getCanceled = function(results){
    query = `SELECT mo.*,i.id_Account,i.FirstName,i.LastName,i.PhoneNumber,i.Avatar,i.Address
                FROM make_order mo
                INNER JOIN inforuser i ON i.id_Account = mo.id_Account
                WHERE mo.id_Status = 4 GROUP BY mo.id DESC`
    db.query(query,[],function(err, orders){
        if(err) return err
        else {
            results({orders})
        }
    })
}
order.changeStatus = function(id_Order,results){
    db.query(`SELECT * FROM make_order WHERE id= ? `,[id_Order],function(err,orders){
        if(err) throw err
        else{
            if(orders[0].id_Status==3||orders[0].id_Status==4){
                return results({message:"can not change status anymore"})
            }
            else {                
                db.query("UPDATE make_order SET id_Status =? WHERE id =?",[orders[0].id_Status+1,id_Order],
                function(err, order){
                    if(err){return results({message:err.message})}
                    else {
                        results({success:true,message:"update status thành công"})
                    } 
                })
            }
        }
    })
}
order.cancelOrder = function(id_Order,results){
    db.query(`SELECT * FROM make_order WHERE id= ? `,[id_Order],function(err,orders){
        if(err) throw err
        else{
            if(orders[0].id_Status>=2){
                return results({message:"can not cancel order anymore"})
            }
            else {                
                db.query("UPDATE make_order SET id_Status =? WHERE id =?",[4,id_Order],
                function(err, order){
                    if(err){return results({success:false,message:err.message})}
                    else {
                        results({success:true,message:"update status thành công"})
                    } 
                })
            }
        }
    })
}
         
module.exports = order
