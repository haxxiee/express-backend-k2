const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db.sqlite", (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  }

  console.log("Connected to DB");

  const usersStmt = `
    CREATE TABLE books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      author TEXT,
      genre TEXT
    )
  `;

  db.run(usersStmt, (error) => {
    if (error) {
      console.error(error.message);
      return;
    } else {
      const insert =
        "INSERT INTO books (title, author, genre) VALUES (?, ?, ?)";
      db.run(insert, ["Don Quixote", "Miguel de Cervantes", "Roman"]);
      db.run(insert, ["The Book Thief", "Markus Zusak", "Historical"]);
      db.run(insert, ["Pride and Prejudice", "Jane Austen", "Romance"]);
      db.run(insert, ["To Kill a Mockingbird", "Harper Lee", "Fiction"]);
      db.run(insert, [
        "Harry Potter and the Order of the Phoenix",
        "J.K. Rowling",
        "Fantasy",
      ]);
      db.run(insert, ["The Hunger Games", "Suzanne Collins", "Young Adult"]);
      db.run(insert, ["The Great Gatsby", "F.Scott Fizgerald", "Mordernism"]);
    }
  });
});

module.exports = db;
