const mongoose = require('mongoose');
require('dotenv').config();

async function seed() {
  // await mongoose.connect(process.env.DATABASE_URL);

  const Book = require('./models/BookSchema.js');

  try {
    await Book.create(
      {
        title: 'Being and Nothingness',
        description: 'An Essay on Phenomenological Ontology',
        status: 'read',
        email: 'bookreader1@gmail.com',
      },
      {
        title: 'Ham on Rye',
        description: 'Auto-biography',
        status: 'unread',
        email: 'charles@gmail.com',
      },
      {
        title: 'Blink',
        description:
          'It presents in popular science format research from psychology and behavioral economics on the adaptive unconscious: mental processes that work rapidly and automatically from relatively little information.',
        status: 'read',
        email: 'bookworm@gmail.com',
      },
      {
        title: 'Daring Greatly',
        description:
          'How the Courage to Be Vulnerable Transforms the Way We Live, Love, Parent, and Lead',
        status: 'unread',
        email: 'nerdygirl@yahoo.com',
      }
    );
  } catch (error) {
    console.log(error);
  }
  // mongoose.disconnect();
}

module.exports = seed;
