const express = require('express');
const router = express.Router();
const Book = require('../models/Book.js'); 

// POST /api/books - Add a new book
router.post('/api/books', async (req, res) => {
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
    res.status(500).json({ error: 'Failed to add the book' });
  }
});

module.exports = router;
