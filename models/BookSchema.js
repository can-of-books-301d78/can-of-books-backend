const mongoose = require('mongoose');

// const { Schema } = mongoose;

const bookSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  status: { type: String },
  email: { type: String },
});

module.exports = {
  Book: mongoose.model('Book', bookSchema),
  bookSchema,
};