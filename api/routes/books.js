const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const Book = require('../models/Book');

const asyncHandler = require('express-async-handler');

// POST request for creating a new book
router.post(
  '/',
  upload.single('coverImage'),
  asyncHandler(async (req, res) => {
    try {
      const { title, startDate, endDate, status, feeling, rating, review, userId } = req.body;

      const newBook = new Book({
        title,
        coverImage: req.file ? req.file.buffer.toString('base64') : undefined,
        startDate,
        endDate,
        status,
        feeling,
        rating,
        review,
        user: userId,
      });

      await newBook.save();

      res.status(201).send(newBook);
    } catch (error) {
      console.error(error); // Log the error message and stack trace

      // Handle different types of errors
      if (error.name === 'ValidationError') {
        // Mongoose validation error
        console.error('Validation Error:', error.errors);
        return res.status(400).json({ error: 'Validation Error', details: error.errors });
      }

      // Log the generic internal server error
      console.error('Internal Server Error:', error);

      // Return a generic internal server error response
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })
);
// Route: Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).send(books);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// Route: Get a book by ID
router.get('/:id', async (req, res) => {
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


module.exports = router;
