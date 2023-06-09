const db = require("../config/db/index");

const order = function (order) {
  (this.id = rating.id),
    (this.id_Status = rating.id_Status),
    (this.id_Account = rating.id_Account),
    (this.id_Payment = rating.id_Payment),
    (this.OrderDate = rating.OrderDate);
  this.OrderAddress = rating.OrderAddress;
};

// tao don hang cho toan bo cart
order.CreateOrderAllCart = function (
  id_Account,
  orderItems,
  address,
  payment,
  results
) {
  var today = new Date();
  for (var i = 0; i < orderItems.length; i++) {
    if (orderItems[i].quantity > orderItems[i].Amount)
      return results({
        success: false,
        message: "Số lượng đặt vượt quá sản phẩm trong kho",
      });
  }
  db.query(
    "INSERT INTO make_order (id_Status,id_Account,id_Payment,OrderDate,OrderAddress) VALUES (?, ?, ?, ?, ?)",
    [1, id_Account, payment, today, address],
    function (err, order) {
      if (err) return err;
      else {
        const orderID = order.insertId;
        var totalPrice = 0;
        orderItems.forEach((orderItem) => {
          totalPrice += orderItem.Price * orderItem.quantity;
          db.query(
            `INSERT INTO order_item (id_Order,id_BookSupplier,quantity,Fixed_Price) VALUES (?, ?, ?, ?)`,
            [
              orderID,
              orderItem.id_BookSupplier,
              orderItem.quantity,
              orderItem.Price * orderItem.quantity,
            ],
            function (err, orderitem) {
              if (err) return err;
              else {
                db.query(
                  "SELECT * FROM book_supplier WHERE id = ?",
                  orderItem.id_BookSupplier,
                  (err, book_supplier) => {
                    if (err) return err;
                    else {
                      db.query(
                        "UPDATE book_supplier SET Amount =? WHERE id = ?",
                        [
                          parseInt(book_supplier[0].Amount) -
                            parseInt(orderItem.quantity),
                          book_supplier[0].id,
                        ],
                        (err, book_suppliers) => {
                          if (err) return err;
                          else {
                            db.query(
                              "DELETE FROM cart_item WHERE id = ?",
                              orderItem.idCartItem,
                              (err, cartitem) => {
                                if (err) return err;
                              }
                            );
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        });
        db.query(
          `UPDATE make_order SET totalPrice =? WHERE id =?`,
          [totalPrice, orderID],
          function (err, order) {
            if (err) return err;
            else
              return results({
                success: true,
                message: "Mua đơn hàng thành công",
              });
          }
        );
      }
    }
  );
};
// tạo don hang cho 1 item
order.CreateOrder = function (
  id_Account,
  orderItem,
  address,
  payment,
  results
) {
  var today = new Date();
  if (orderItem.quantity > orderItem.Amount)
    return results({
      success: false,
      message: "Số lượng đặt vượt quá sản phẩm trong kho",
    });
  else {
    db.query(
      "INSERT INTO make_order (id_Status,id_Account,id_Payment,OrderDate,OrderAddress) VALUES (?, ?, ?, ?, ?)",
      [1, id_Account, payment, today, address],
      function (err, order) {
        if (err) return err;
        else {
          const orderID = order.insertId;
          var totalPrice = 0;
          totalPrice += orderItem.Price * orderItem.quantity;
          db.query(
            `INSERT INTO order_item (id_Order,id_BookSupplier,quantity,Fixed_Price) VALUES (?, ?, ?, ?)`,
            [
              orderID,
              orderItem.id_BookSupplier,
              orderItem.quantity,
              orderItem.Price * orderItem.quantity,
            ],
            function (err, orderitem) {
              if (err) return err;
              else {
                db.query(
                  "SELECT * FROM book_supplier WHERE id = ?",
                  orderItem.id_BookSupplier,
                  (err, book_supplier) => {
                    if (err) return err;
                    else {
                      console.log(book_supplier);
                      db.query(
                        "UPDATE book_supplier SET Amount =? WHERE id = ?",
                        [
                          parseInt(book_supplier[0].Amount) -
                            parseInt(orderItem.quantity),
                          book_supplier[0].id,
                        ],
                        (err, book_suppliers) => {
                          if (err) return err;
                        }
                      );
                    }
                  }
                );
              }
            }
          );
          db.query(
            `UPDATE make_order SET totalPrice =? WHERE id =?`,
            [totalPrice, orderID],
            function (err, order) {
              if (err) return err;
              else
                return results({
                  success: true,
                  message: "Mua sản phẩm thành công",
                });
            }
          );
        }
      }
    );
  }
};
//huy don hang
order.cancelOrder = function (id_Order, results) {
  db.query(
    `SELECT * FROM make_order WHERE id= ? `,
    [id_Order],
    function (err, orders) {
      if (err) throw err;
      else {
        if (orders[0].id_Status >= 2) {
          return results({
            success: false,
            message:
              "Đơn hàng đang giao hoặc đã giao thành công (không thể hủy)",
          });
        } else {
          db.query(
            "UPDATE make_order SET id_Status =? WHERE id =?",
            [4, id_Order],
            function (err, order) {
              if (err) {
                return results({ success: false, message: err.message });
              } else {
                db.query(
                  "SELECT * FROM order_item WHERE id_Order = ?",
                  [id_Order],
                  (err, orderItems) => {
                    if (err) {
                      return results({ success: false, message: err.message });
                    } else {
                      orderItems.forEach((orderItem) => {
                        db.query(
                          "SELECT * FROM book_supplier WHERE id = ?",
                          [orderItem.id_BookSupplier],
                          (err, booksuppliers) => {
                            if (err) {
                              return results({
                                success: false,
                                message: err.message,
                              });
                            } else {
                              db.query(
                                "UPDATE book_supplier SET Amount =? WHERE id =?",
                                [
                                  orderItem.quantity + booksuppliers[0].Amount,
                                  orderItem.id_BookSupplier,
                                ]
                              ),
                                (err, booksupplier) => {
                                  if (err) {
                                    return results({
                                      success: false,
                                      message: err.message,
                                    });
                                  }
                                };
                            }
                          }
                        );
                      });
                      results({
                        success: true,
                        message: "Hủy đơn hàng thành công",
                      });
                    }
                  }
                );
              }
            }
          );
        }
      }
    }
  );
};
// xem chi tiet don hang
order.GetOrderDetailsbyOrderId = function (id_Order, results) {
  const query1 = `SELECT mo.*,s.Status,p.Payment_Method 
                FROM make_order mo
                INNER JOIN status s ON mo.id_Status = s.id
                INNER JOIN payment p ON mo.id_Payment = p.id
                WHERE mo.id = ?`;

  db.query(query1, [id_Order], function (err, orderInfor) {
    const query2 = `SELECT oi.id, oi.id_BookSupplier,oi.quantity, oi.Fixed_Price, oi.isRated,
                    b.Name, b.Author, b.Price, b.id as idBook,
                    bs.Import_Price, 
                    ib.Image, s.Name as Supplier 
                    FROM order_item oi
                    INNER JOIN book_supplier bs ON oi.id_BookSupplier = bs.id
                    INNER JOIN book b ON bs.id_Book = b.id
                    LEFT JOIN (
                    SELECT id_Book, Image FROM image_book GROUP BY id_Book
                    ) ib ON b.id = ib.id_Book
                    INNER JOIN supplier s ON bs.id_Supplier = s.id
                    WHERE oi.id_Order = ?`;
    db.query(query2, [id_Order], function (err, Order) {
      if (err) return results({ message: err.message });
      else {
        results({ orderInfor: orderInfor[0], orderDetail: Order });
      }
    });
  });
};
// xem lich su don hang cua 1 tai khoan
order.getHistoryOrderList = function (id_Account, results) {
  const query = `SELECT mo.*,s.Status,p.Payment_Method
                    FROM make_order mo
                    INNER JOIN status s ON mo.id_Status = s.id
                    INNER JOIN payment p ON mo.id_Payment = p.id
                    WHERE mo.id_Account = ? 
                    GROUP BY mo.id DESC`;
  db.query(query, [id_Account], function (err, Orders) {
    results({ OrderList: Orders });
  });
};
order.getHistoryStatusOrderList = function (id_Account, id_status, results) {
  const query = `SELECT mo.*,s.Status,p.Payment_Method
                    FROM make_order mo
                    INNER JOIN status s ON mo.id_Status = s.id
                    INNER JOIN payment p ON mo.id_Payment = p.id
                    WHERE mo.id_Account = ? AND mo.id_Status = ? 
                    GROUP BY mo.id DESC`;
  db.query(query, [id_Account, id_status], function (err, Orders) {
    results({ OrderList: Orders });
  });
};
//xem lich su don hang nhieu tai khoan

order.getOrderList = function (results) {
  const query = `SELECT mo.*,i.id_Account,i.FirstName,i.LastName,i.PhoneNumber,i.Avatar,i.Address
                    FROM make_order mo
                    INNER JOIN inforuser i ON i.id_Account = mo.id_Account
                    GROUP BY mo.id DESC`;
  db.query(query, [], function (err, orders) {
    if (err) return err;
    else {
      results(orders);
    }
  });
};
order.getStatusOrder = function (id_status, results) {
  const query = `SELECT mo.*,i.id_Account,i.FirstName,i.LastName,i.PhoneNumber,i.Avatar,i.Address
                    FROM make_order mo
                    INNER JOIN inforuser i ON i.id_Account = mo.id_Account
                    WHERE mo.id_Status = ? GROUP BY mo.id DESC`;
  db.query(query, [id_status], function (err, orders) {
    if (err) return err;
    else {
      results(orders);
    }
  });
};
order.changeStatus = function (id_Order, results) {
  db.query(
    `SELECT * FROM make_order WHERE id= ? `,
    [id_Order],
    function (err, orders) {
      if (err) throw err;
      else {
        if (orders[0].id_Status == 3 || orders[0].id_Status == 4) {
          return results({
            message: "Không thể thay đổi trạng thái đơn hàng nữa",
          });
        } else {
          db.query(
            "UPDATE make_order SET id_Status =? WHERE id =?",
            [orders[0].id_Status + 1, id_Order],
            function (err, order) {
              if (err) {
                return results({ message: err.message });
              } else {
                results({
                  success: true,
                  message: "Duyệt đơn hàng thành công",
                });
              }
            }
          );
        }
      }
    }
  );
};
// xem doanh thu

order.Revenue = function (data, results) {
  var today = new Date();
  var query = `SELECT mo.*,i.id_Account,i.FirstName,i.LastName,i.PhoneNumber,i.Avatar,i.Address
                FROM make_order mo
                INNER JOIN inforuser i ON i.id_Account = mo.id_Account
                WHERE mo.id_Status = 3 `;
  var query2 = `SELECT DATE(OrderDate) AS revenue_date, SUM(totalPrice) AS revenue
                FROM make_order WHERE id_Status = 3 `;

  if (data.dateMin && data.dateMax) {
    query += `AND DATE(mo.OrderDate) >= '${data.dateMin}'
                    AND DATE(mo.OrderDate) <= '${data.dateMax}' `;
    query2 += `AND DATE(OrderDate) >= '${data.dateMin}'
                    AND DATE(OrderDate) <= '${data.dateMax}' `;
  } else {
    query += `AND DATE(mo.OrderDate) >= '${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}'
                    AND DATE(mo.OrderDate) <= '${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}'`;
    query2 += `AND DATE(OrderDate) >= '${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}'
                    AND DATE(OrderDate) <= '${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}'`;
  }
  query += `GROUP BY mo.id DESC`;
  query2 += `GROUP BY revenue_date
             ORDER BY revenue_date ASC`;
  db.query(query, [], (err, successOrder) => {
    if (err) return results({ success: false, message: err.message });
    var totalRevenue = 0;
    for (var i = 0; i < successOrder.length; i++) {
      totalRevenue += parseInt(successOrder[i].totalPrice);
    }
    db.query(query2, [], (err, chartRevenue) => {
      if (err) return results({ success: false, message: err.message });
      else
        return results({
          totalRevenue: totalRevenue,
          order: successOrder,
          chartRevenue: chartRevenue,
        });
    });
  });
};
order.RevenueOfYear = function (results) {
  // tổng sản phảm mua trong 1 năm
  var query1 = `SELECT SUM(oi.quantity) AS total_books_sold
                    FROM order_item oi INNER JOIN make_order mo ON oi.id_Order = mo.id
                    WHERE mo.id_Status = 3
                    AND YEAR(OrderDate) = YEAR(CURRENT_DATE);`;
  // tổng doanh thu trong 1 năm
  var query2 = `SELECT SUM(totalPrice) AS total_revenue
                    FROM make_order
                    WHERE id_Status = 3
                    AND YEAR(OrderDate) = YEAR(CURRENT_DATE);`;
  // khách hàng tiềm năng và số sản phẩm khách hàng đó mua
  var query3 = `SELECT i.FirstName,i.LastName, SUM(oi.quantity) AS total_purchases
                    FROM order_item oi
                    INNER JOIN make_order mo ON oi.id_Order = mo.id
                    INNER JOIN inforuser i ON i.id_Account = mo.id_Account
                    WHERE mo.id_Status = 3
                    AND YEAR(mo.OrderDate) = YEAR(CURRENT_DATE)
                    GROUP BY i.LastName
                    ORDER BY total_purchases DESC 
                    LIMIT 1;`;
  // top 10 sản phẩm bán chạy
  var query4 = `SELECT b.Name AS product_name,SUM(oi.quantity) AS total_sold
                    FROM order_item oi
                    INNER JOIN make_order mo ON oi.id_Order = mo.id
                    INNER JOIN book_supplier bs ON oi.id_BookSupplier = bs.id
                    INNER JOIN book b ON bs.id_Book = b.id
                    WHERE mo.id_Status = 3 
                    AND YEAR(mo.OrderDate) = YEAR(CURRENT_DATE)
                    GROUP BY oi.id_BookSupplier
                    ORDER BY total_sold DESC
                    LIMIT 10;`;
  db.query(query1, (err, YearNumberOfProducts) => {
    if (err) return results({ success: false, message: err.message });
    else {
      db.query(query2, (err, RevenueofYear) => {
        if (err) return results({ success: false, message: err.message });
        else {
          db.query(query3, (err, potentialCustomer) => {
            if (err) return results({ success: false, message: err.message });
            else {
              db.query(query4, (err, TopProduct) => {
                if (err)
                  return results({ success: false, message: err.message });
                else
                  return results({
                    NumberOfProducts: YearNumberOfProducts[0].total_books_sold,
                    RevenueofYear: RevenueofYear[0].total_revenue,
                    potentialCustomer: potentialCustomer[0],
                    TopProduct: TopProduct,
                  });
              });
            }
          });
        }
      });
    }
  });
};
module.exports = order;
