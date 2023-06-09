const db = require("../config/db/index");

const book = function (book) {
  (this.id = book.id),
    (this.id_Category = book.id_Category),
    (this.Name = book.Name),
    (this.Price = book.Price),
    (this.Author = book.Author),
    (this.Description = book.Description);
  (this.Publication_Date = book.Publication_Date),
    (this.Publisher = book.Publisher);
};
book.add = function (data, BookPath, results) {
  var today = Date();
  db.query(
    "INSERT INTO book (id_Category, Name, Price, Author, Description,Publication_Date,Publisher) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      data.id_Category,
      data.Name,
      data.Price,
      data.Author,
      data.Description,
      today,
      data.Publisher,
    ],
    function (err, book) {
      if (err) return err;
      else if (BookPath == null)
        return results({
          success: true,
          message: "Thêm thành công(without Images)",
        });
      else {
        db.query(
          "INSERT INTO image_book (id_Book, Image) VALUES (?, ?)",
          [book.insertId, BookPath],
          function (err, images) {
            if (err) return err;
            else {
              return results({ success: true, message: "Thêm thành công" });
            }
          }
        );
      }
    }
  );
};
book.find = function (data, results) {
  if (!data.id) {
    let query = `SELECT b.id, b.id_Category, b.Name, b.Author, b.Price, b.Description, i.Image,c.Name AS category
      FROM book b LEFT JOIN ( SELECT id_Book, MIN(id) AS min_id FROM image_book GROUP BY id_Book ) m 
      ON b.id = m.id_Book 
      LEFT JOIN image_book i ON m.min_id = i.id 
      INNER JOIN category c ON c.id = b.id_Category
      WHERE b.Name LIKE '%${data.search}%'`;
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
      query += ` AND Author = '${data.author}'`;
    }
    db.query(query, (err, listBook) => {
      var totalPage = parseInt(listBook.length / data.limit) + 1;
      const offset = (data.page - 1) * data.limit;
      if (data.DESC_Price == 1)
        query += ` ORDER BY b.Price DESC LIMIT ${data.limit} OFFSET ${offset}`;
      else if (data.DESC_Price == 2)
        query += ` ORDER BY b.Price ASC LIMIT ${data.limit} OFFSET ${offset}`;
      else query += ` ORDER BY b.id DESC LIMIT ${data.limit} OFFSET ${offset}`;
      db.query(query, function (err, books) {
        if (err) return { success: false, message: err.message };
        else {
          return results({ books: books, totalPage: totalPage });
        }
      });
    });
  } else {
    var images = [];
    var ratings = [];
    var book = {};
    var query = `SELECT b.*,bs.id as id_BookSupplier, bs.Import_Price, bs.Amount, s.Name as Supplier,c.Name AS category
                    FROM book b
                    LEFT JOIN book_supplier bs ON bs.id_Book = b.id
                    LEFT JOIN supplier s ON s.id = bs.id_Supplier
                    INNER JOIN category c ON c.id = b.id_Category
                    WHERE b.id = ? ORDER BY bs.Import_Price ASC LIMIT 1`;
    db.query(query, data.id, function (err, books) {
      if (err) return results({ success: false, message: err.message });
      book = books[0];

      db.query(
        "SELECT * FROM image_book WHERE id_Book = ?",
        books[0].id,
        function (err, image) {
          if (err) return results({ success: false, message: err.message });
          images = image;
          db.query(
            `SELECT rating.id,rating.id_Account,rating.comment,rating.star, inforuser.FirstName,inforuser.LastName,inforuser.Avatar
                      FROM rating
                      INNER JOIN inforuser 
                      ON rating.id_Account = inforuser.id_Account 
                      WHERE rating.id_Book = ?`,
            books[0].id,
            function (err, rating) {
              if (err) return results({ success: false, message: err.message });
              ratings = rating;
              var stars = 0;
              for (let i = 0; i < ratings.length; i++) {
                stars += ratings[i].star;
              }
              stars = Math.round(stars / ratings.length);
              if (isNaN(stars)) stars = 0;
              book.stars = stars;
              // Thực hiện các thao tác cần thiết với ratings ở đây
              results({ book: book, images: images, ratings: ratings });
              // Thực hiện các thao tác cần thiết với book, images, ratings ở đây
            }
          );
        }
      );
    });
  }
};

book.delete = function (idBook, results) {
  db.query("DELETE FROM book WHERE id =?", idBook, function (err, books) {
    if (err) return err;
    else {
      results({ success: true, message: "Xóa thành công" });
    }
  });
};
book.update = function (idBook, data, results) {
  db.query(
    "UPDATE book SET id_Category =?,Name =?,Price =?,Author =?,Description =?,Publication_Date= ?,Publisher=? WHERE id =?",
    [
      data.id_Category,
      data.Name,
      data.Price,
      data.Author,
      data.Description,
      data.Publication_Date,
      data.Publisher,
      idBook,
    ],
    function (err, books) {
      if (err) return err;
      else {
        results({ success: true, message: "Cập nhật thành công" });
      }
    }
  );
};
module.exports = book;
