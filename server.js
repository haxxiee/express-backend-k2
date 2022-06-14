const express = require("express");
const booksRouter = require("./router/book.router");

const app = express();

app.use(express.json());
app.use("/books", booksRouter);

app.listen(4000, () => {
  console.log("Servern is running on port 4000");
});
