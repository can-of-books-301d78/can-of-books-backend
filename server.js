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

const BookModel = require('./models/BookSchema.js');
const Book = require('./models/BookSchema.js');

const seed = require('./seed');
// seed();

// what is this?
const { request, response } = require('express');

app.get('/books', async (request, response) => {
  const filterQuery = {};
  // change location to email?
  if (request.query.location) {
    filterQuery.location = request.query.location;
  }
  const books = await BookModel.find(filterQuery);

  response.send(books);
});

app.post('/books', async (request, response) => {
  const newBook = await Book.create({
    ...request.body,
    email: request.query.email,
  });
  response.send(newBook);
});

app.delete('/books/:id', async (request, response) => {
  // if email sent on query, then...
  if (request.query.email) {
    // get the book that matches id AND email
    const foundBook = await Book.findOne({
      _id: request.params.id,
      email: request.query.email,
    });

    // only delete if found
    console.log({ foundBook });

    // const deleteResult = await Book.findByIdAndDelete(request.params.id);

    if (foundBook) {
      const deleteResult = await Book.findByIdAndDelete(request.params.id);
      console.log({ deleteResult });
      response.status(204).send('success');
    } else {
      response.status(400).send('You cannot delete that book'); // correct status code??
    }
  } else {
    response.status(403).send('You must be logged in');
  }
});

app.put('/books/:id', async (request, response) => {
  const id = request.params.id;
  let updatedBook = await Book.findByIdAndUpdate(id, { ...request.body });
  response.status(204).send(updatedBook);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
