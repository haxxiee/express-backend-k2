const model = require("../models/books");

async function getBooks(req, res) {
  try {
    const result = await model.getAll();

    res.json(result);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
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
  res.json({ message: "success", data: result });
}

async function putBook(req, res) {
  const { title, author, genre } = req.body;
  const id = req.params.id;
  const bookExist = await model.getOne(id);

  if (!bookExist) {
    return res
      .status(400)
      .send({ message: `Book with id ${req.params.id} does not exist` });
  }
  if (!title || !author || !genre) {
    return res
      .status(400)
      .send({ message: `You have to send the FULL information` });
  }

  const newBook = {
    title,
    author,
    genre,
  };

  await model.update(id, newBook);
  const result = await model.getOne(id);

  res.json({ message: "success", data: result });
}

async function patchBook(req, res) {
  const { title, author, genre } = req.body;
  const id = req.params.id;
  const bookExist = await model.getOne(id);

  if (!bookExist) {
    return res
      .status(400)
      .send({ message: `Book with id ${req.params.id} does not exist` });
  }

  if (!title && !author && !genre) {
    return res
      .status(400)
      .send({ message: `You have to send SOME information` });
  }

  const newBook = {
    title,
    author,
    genre,
  };

  await model.update(id, newBook);
  const result = await model.getOne(id);

  res.json({ message: "success", data: result });
}

async function deleteBook(req, res) {
  const id = req.params.id;
  const bookExist = await model.getOne(id);

  if (!bookExist) {
    return res
      .status(400)
      .send({ message: `Book with id ${req.params.id} does not exist` });
  }

  await model.remove(id);

  res.json({ message: "successfully removed", id: `${id}` });
}

module.exports = {
  all: getBooks,
  singel: getSingleBook,
  add: addBook,
  patch: patchBook,
  put: putBook,
  remove: deleteBook,
};
