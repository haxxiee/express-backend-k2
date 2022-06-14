const express = require("express");

const booksController = require("../controllers/books.controller");
const booksRouter = express.Router();

booksRouter.get("/", booksController.all);
booksRouter.get("/:id", booksController.singel);
booksRouter.post("/", booksController.add);
booksRouter.patch("/:id", booksController.patch);
booksRouter.put("/:id", booksController.put);
booksRouter.delete("/:id", booksController.remove);

module.exports = booksRouter;
