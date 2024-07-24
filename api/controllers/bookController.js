const multer = require('multer');
const Book = require('./models/Book');

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('coverImage');

// Controller for creating a new book with form data and file upload
const createBook = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          console.error('Multer Error:', err);
          return res.status(400).json({ error: 'Invalid request' });
        }
        console.error('Unknown Error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      const { title, startDate, endDate, status, feeling, rating, review } = req.body;
      const { buffer, mimetype } = req.file;

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

      const savedBook = await newBook.save();
      res.json(savedBook);
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
};
