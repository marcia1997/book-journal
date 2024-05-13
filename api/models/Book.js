// models/Book.js

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  coverImage: {
    type: Buffer,  // Use Buffer to store binary data
    required: true,
  },
  coverImageType: {
    type: String,  // Store the MIME type of the image
    required: true,
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Wish', 'Currently Reading', 'Stop it', 'Read'],
    required: true
  },
  feeling: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  review: {
    type: String,
    required: true
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
