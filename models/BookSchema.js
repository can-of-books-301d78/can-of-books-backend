const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  status: { type: String },
  email: { type: String },
});

const Book = mongoose.model('book', bookSchema);

module.exports = Book;
