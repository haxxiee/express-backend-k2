const model = require("../models/books");

async function getBooks(req, res) {
  const result = await model.getAll();

  res.json(result);
}

async function getSingleBook(req, res) {
  const result = await model.getOne(req.params.id);

  if (!result) {
    return res
      .status(400)
      .send({ message: `Book with id ${req.params.id} does not exist` });
  }

  res.json(result);
}

async function addBook(req, res) {
  const { title, author, genre } = req.body;

  if (!title || !author || !genre) {
    return res
      .status(400)
      .send({ message: `You have to send ALL the information` });
  }

  const newBook = {
    title,
    author,
    genre,
  };

  const result = await model.addOne(newBook);
  res.json(result);
}

module.exports = {
  all: getBooks,
  singel: getSingleBook,
  add: addBook,
};
