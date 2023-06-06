
const db = require('../config/db/index')

class CartItem {
  constructor (id, bookSupplierId, cartId, quantity) {
    this.id = id
    this.bookSupplierId = bookSupplierId
    this.cartId = cartId
    this.quantity = quantity
  }

  static async createCartItem (bookSupplierId, cartId, quantity) {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO cart_item (id_BookSupplier, id_cart, quantity) VALUES (?, ?, ?)`,
        [bookSupplierId, cartId, quantity],
        (err, res) => {
          if (err) {
            reject(err)
          } else {
            const newCartItem = new CartItem(
              res.insertId,
              bookSupplierId,
              cartId,
              quantity
            )
            resolve(newCartItem)
          }
        }
      )
    })
  }

  static async updateCartItemQuantity (cartItemId, newQuantity) {

    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE cart_item SET quantity = ? WHERE id = ?`,
        [newQuantity, cartItemId],
        (err, res) => {
          if (err) {

            reject(err)
          } else {
            resolve(res.affectedRows > 0)
          }
        }
      )
    })
  }

  static async deleteCartItem (cartItemId) {
    return new Promise((resolve, reject) => {
      db.query(
        `DELETE FROM cart_item WHERE id = ?`,
        [cartItemId],
        (err, res) => {
          if (err) {

            reject(err)
          } else {
            resolve(res.affectedRows > 0)
          }
        }
      )
    })
  }

  static async getCartItemByCartIdAndBookSupplierId (cartId, bookSupplierId) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM cart_item WHERE id_cart = ? AND id_BookSupplier = ?`,
        [cartId, bookSupplierId],
        (err, res) => {
          if (err) {
            reject(err)
          } else {
            if (res.length > 0) {
              const { id, id_BookSupplier, id_cart, quantity } = res[0]
              const cartItem = new CartItem(
                id,
                id_BookSupplier,
                id_cart,
                quantity

              )
              resolve(cartItem)
            } else {
              resolve(null)
            }
          }
        }
      )
    })
  }

  static async getCartItemsByCartId (cartId) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT ci.id, ci.id_BookSupplier, ci.id_cart, ci.quantity, 
        b.Name, b.Author, b.Price, 
        bs.Import_Price, bs.Amount, 

        ib.Image, s.Name as Supplier 
        FROM cart_item ci
        INNER JOIN book_supplier bs ON ci.id_BookSupplier = bs.id
        INNER JOIN book b ON bs.id_Book = b.id
        INNER JOIN (
          SELECT id_Book, Image FROM image_book GROUP BY id_Book
        ) ib ON b.id = ib.id_Book
        INNER JOIN supplier s ON bs.id_Supplier = s.id

        WHERE ci.id_cart = ?`,
        [cartId],
        (err, res) => {
          if (err) {
            reject(err)
          } else {
            const cartItems = res.map(row => {
              const {
                id,
                id_BookSupplier,
                id_Cart,
                quantity,
                Name,
                Author,
                Price,
                Import_Price,
                Amount,
                Image,
                Supplier
              } = row
              return {
                id,
                bookSupplierId: id_BookSupplier,
                cartId: id_Cart,
                quantity,
                Name,
                author: Author,
                price: Price,
                importPrice: Import_Price,
                amount: Amount,
                image: Image,
                supplier: Supplier
              }
            })
            resolve(cartItems)
          }
        }
      )
    })
  }
}

module.exports = CartItem

