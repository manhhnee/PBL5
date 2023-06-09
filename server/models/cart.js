const db = require("../config/db/index");
const cart = function (cart) {
  (this.id = cart.id),
    (this.id_Account = cart.id_Account),
    (this.Created_Date = cart.created_Date);
};
cart.getCartDetailsbyIdAccount = function (id_Account, results) {
  db.query(
    "SELECT * FROM cart WHERE id_Account =?",
    id_Account,
    function (err, cart) {
      if (err) return results({ message: err.message });
      else {
        var cartID = cart[0].id;
        const query = `SELECT ci.id, ci.id_BookSupplier, ci.id_cart, ci.quantity, 
                      b.Name, b.Author, b.Price, c.Name as Category,
                      bs.Import_Price, bs.Amount, 
                      ib.Image, s.Name as Supplier 
                      FROM cart_item ci
                      INNER JOIN book_supplier bs ON ci.id_BookSupplier = bs.id
                      INNER JOIN book b ON bs.id_Book = b.id
                      INNER JOIN category c ON c.id = b.id_Category
                      LEFT JOIN (
                        SELECT id_Book, Image FROM image_book GROUP BY id_Book
                      ) ib ON b.id = ib.id_Book
                      INNER JOIN supplier s ON bs.id_Supplier = s.id
                      WHERE ci.id_cart = ?`;
        db.query(query, cartID, function (err, cartItem) {
          if (err) return results({ message: err.message });
          else results({ cartItem });
        });
      }
    }
  );
};
cart.addItemIntoCart = function (id_Account, data, results) {
  db.query(
    "SELECT * FROM cart WHERE id_Account =?",
    id_Account,
    function (err, cart) {
      if (err) return results({ message: err.message });
      else {
        if (data.id_BookSupplier == null)
          return results({ success: false, message: "Sản phẩm đã hết hàng" });
        db.query(
          "SELECT * FROM cart_item WHERE id_BookSupplier = ? AND id_cart = ?",
          [data.id_BookSupplier, cart[0].id],
          function (err, cartItems) {
            if (err) return results({ message: err.message });
            // truong hop da co sach nay trong gio hang
            else if (cartItems.length > 0) {
              db.query(
                "UPDATE cart_item SET quantity = ? WHERE id = ?",
                [
                  parseInt(cartItems[0].quantity) + parseInt(data.quantity),
                  cartItems[0].id,
                ],
                function (err, cartItem) {
                  if (err)
                    return results({ success: false, message: err.message });
                  else
                    return results({
                      success: true,
                      message:
                        "Update số lượng sản phẩm vào giỏ hàng thành công",
                    });
                }
              );
            }
            // truong hop chua co sach nay trong gio hang
            else {
              db.query(
                "INSERT INTO cart_item ( id_BookSupplier, id_Cart, quantity) VALUES (?,?,?)",
                [data.id_BookSupplier, cart[0].id, data.quantity],
                function (err, cart) {
                  if (err)
                    return results({ success: false, message: err.message });
                  else
                    return results({
                      success: true,
                      message: "Thêm vào giỏ hàng thành công",
                    });
                }
              );
            }
          }
        );
      }
    }
  );
};
cart.updateQuantityCartItems = function (
  id_Account,
  idCartItem,
  quantity,
  results
) {
  if (quantity <= 0) {
    db.query(
      "DELETE FROM cart_item WHERE id = ?",
      idCartItem,
      (err, cartItem) => {
        if (err) return results({ success: false, message: err.message });
        else
          return results({
            success: true,
            message: "Đã xóa sản phẩm khỏi giỏ hàng",
          });
      }
    );
  } else {
    db.query(
      "UPDATE cart_item SET quantity = ? WHERE id = ?",
      [quantity, idCartItem],
      (err, cartItem) => {
        if (err) return results({ success: false, message: err.message });
        else
          return results({
            success: true,
            message: "Update số lượng sản phẩm thành công",
          });
      }
    );
  }
};
cart.deleteCartItems = function (id_Account, idCartItem, results) {
  db.query("DELETE FROM cart_item WHERE id = ?", idCartItem, (err, cart) => {
    if (err) return results({ success: false, message: err.message });
    else
      return results({
        success: true,
        message: "Đã xóa sản phẩm khỏi giỏ hàng",
      });
  });
};

module.exports = cart;
