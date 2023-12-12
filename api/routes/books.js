// book.js (routes)
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const Book = require('../models/Book');


// Route: Create a new book
router.post('/books',upload.single('coverImage'), async (req, res) => {
  try {
    // ... (your existing code for creating a new book)
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// Route: Get all books
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).send(books);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// Route: Get a single book by ID
router.get('/books/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).send({ error: 'Book not found' });
    }

    res.status(200).send(book);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// Add routes for updating and deleting a book if needed

module.exports = router;
