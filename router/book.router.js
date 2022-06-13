const express = require("express");

const booksController = require("../controllers/books.controller");
const booksRouter = express.Router();

booksRouter.get("/", booksController.all);
booksRouter.get("/:id", booksController.singel);
booksRouter.post("/", booksController.add);

module.exports = booksRouter;
