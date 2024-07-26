const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Route to create a new book
router.post('/books', async (req, res) => {
  try {
    const newBook = new Book({
      title: req.body.title,
      status: req.body.status,
      feeling: req.body.feeling,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      rating: req.body.rating,
      review: req.body.review,
      coverImage: req.body.coverImage,
    });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ error: 'Failed to add the book' });
  }
});


// Route to get all books
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error('Error retrieving books:', error);
    res.status(500).json({ error: 'Failed to retrieve books' });
  }
});

// Route to get a book by ID
router.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    console.error('Error retrieving book:', error);
    res.status(500).json({ error: 'Failed to retrieve the book' });
  }
});

// Route to update a book by ID
router.put('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    book.title = req.body.title;
    book.status = req.body.status;
    book.feeling = req.body.feeling;
    book.startDate = req.body.startDate;
    book.endDate = req.body.endDate;
    book.rating = req.body.rating;
    book.review = req.body.review;
    book.coverImage = req.body.coverImage;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ error: 'Failed to update the book' });
  }
});

// Route to delete a book by ID
router.delete('/books/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(deletedBook);
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Failed to delete the book' });
  }
});

module.exports = router;
