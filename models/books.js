const db = require("../config/database");

function getAll() {
  const sql = "SELECT * from books";

  return new Promise((resolve, reject) => {
    db.all(sql, (error, rows) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

function getOne(id) {
  const sql = "SELECT * FROM books WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.get(sql, id, (error, rows) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

function addOne(book) {
  const sql = "INSERT INTO books (title, author, genre) VALUES (?, ?, ?)";

  return new Promise((resolve, reject) => {
    db.run(sql, [book.title, book.author, book.genre], (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve();
    });
  });
}

function update(id, book) {
  const sql = `UPDATE books set
    title = COALESCE(?,title),
    author = COALESCE(?,author),
    genre = COALESCE(?,genre)
    WHERE id = ?`;

  return new Promise((resolve, reject) => {
    db.run(sql, [book.title, book.author, book.genre, id], (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve();
    });
  });
}

function remove(id) {
  const sql = "DELETE FROM books WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.run(sql, id),
      (error) => {
        if (error) reject(error);
      };
    resolve();
  });
}

module.exports = {
  getAll,
  getOne,
  addOne,
  update,
  remove,
};
