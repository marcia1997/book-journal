const multer = require('multer');
const Book = require('./models/book');

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('coverImage');

// Controller for creating a new book with form data and file upload
const createBook = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          // A multer error occurred
          console.error('Multer Error:', err);
          return res.status(400).json({ error: 'Invalid request' });
        }
        // An unknown error occurred
        console.error('Unknown Error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      // No multer error, proceed with creating the book
      const { title, startDate, endDate, status, feeling, rating, review } = req.body;

      // Access the file (coverImage) from the request
      const { buffer, mimetype } = req.file;

      // Create a new book instance
      const newBook = new Book({
        title,
        startDate,
        endDate,
        status,
        feeling,
        rating,
        review,
        coverImage: {
          data: buffer,
          contentType: mimetype,
        },
      });

      // Save the new book to the database
      const savedBook = await newBook.save();

      // Respond with the saved book data
      res.json(savedBook);
    });
  } catch (error) {
    handleServerError(res, error);
  }
};

// Controller for getting all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    handleServerError(res, error);
  }
};

// Controller for getting a specific book by ID
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    handleServerError(res, error);
  }
};

// Controller for updating a book by ID
const updateBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, startDate, endDate, status, feeling, rating, review } = req.body;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    book.title = title;
    book.startDate = startDate;
    book.endDate = endDate;
    book.status = status;
    book.feeling = feeling;
    book.rating = rating;
    book.review = review;
    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (error) {
    handleServerError(res, error);
  }
};

// Controller for deleting a book by ID
const deleteBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(deletedBook);
  } catch (error) {
    handleServerError(res, error);
  }
};

// Helper function for handling server errors
const handleServerError = (res, error) => {
  console.error('Error:', error);
  res.status(500).json({ error: 'Internal Server Error' });
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
};
