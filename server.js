'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors());
const seed = require('./seed');

const PORT = process.env.PORT || 3001;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

const BookModel = require('./models/BookSchema.js');

mongoose.connect('mongodb://localhost:27017/books');
// seed();

app.get('/books', async (request, response) => {
  const filterQuery = {};
  if (request.query.location) {
    filterQuery.location = request.query.location;
  }
  const books = await BookModel.find(filterQuery);

  response.send(books);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));

// app.get('/test', (request, response) => {
//   response.send('test request received');
// });

// const BookModel = mongoose.model('book-collection', bookSchema);

// const book1 = new BookModel(
//   'Being and Nothingness',
//   'An Essay on Phenomenological Ontology',
//   'read',
//   'bookreader1@gmail.com'
// );

// const book2 = new BookModel(
//   'Ham on Rye',
//   'Auto-biography',
//   'unread',
//   'charles@gmail.com'
// );

// const book3 = new BookModel(
//   'Blink',
//   ' It presents in popular science format research from psychology and behavioral economics on the adaptive unconscious: mental processes that work rapidly and automatically from relatively little information.',
//   'read',
//   'bookworm@gmail.com'
// );

// const book4 = new BookModel(
//   'Daring Greatly',
//   'How the Courage to Be Vulnerable Transforms the Way We Live, Love, Parent, and Lead',
//   'unread',
//   'nerdygirl@yahoo.com'
// );
