'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(express.json());

// Mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

// const BookModel = require('./models/BookSchema.js');
const Book = require('./models/BookSchema.js');

const seed = require('./seed');
seed();

// what is this?
// const { request, response } = require('express');

// routes
app.get('/books', getBooks);
app.post('/books', createBook);
app.delete('/books/:id', deleteBook);
app.put('/books/:id', updateBook);

// GET
async function getBooks(request, response) {
  try {
    // console.log('I made it', request.query);
    const books = await Book.find({});
    response.send(books);
  } catch (error) {
    console.error(error);
    response.status(400).send('Could not find books');
  }
}

// email: request.query.email
// title: request.query.title,
// description: request.query.description,
// status: request.query.status,

// POST
async function createBook(request, response) {
  try {
    console.log('I am here', request.body);
    const book = await Book.create(request.body);
    response.send(book);
  } catch (error) {
    console.error(error);
    response.status(400).send('Unable to create book');
  }
}

// DELETE
async function deleteBook(request, response) {
  try {
    const email = request.query.email;
    const id = request.params.id;
    const book = await Book.findOne({ _id: id, email });
    if (!book) {
      response.status(400).send('Unable to delete book');
      return;
    }
    if (book.email !== email) {
      response.status(400).send('Unable to delete book');
      return;
    }
    await Book.findByIdAndDelete(id);
    response.send('Success!');
  } catch (error) {
    console.error(error);
    response.status(400).send('Unable to delete book');
  }
}

// PUT
async function updateBook(request, response) {
  const id = request.params.id;
  const email = request.query.email;
  try {
    const bookToUpdate = await Book.findOne({ _id: id, email });
    if (!bookToUpdate) {
      response.status(400).send('Unable to update book');
      return;
    }
    const updatedBook = await Book.findByIdAndUpdate(id, request.body, {
      new: true,
    });
    response.send(updateBook);
  } catch (error) {
    console.error(error);
    response.status(400).send('Unable to update book');
  }
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
