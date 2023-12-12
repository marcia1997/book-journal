
// controllers/bookController.js
const Book = require('./models/book'); // Import your Book model

// Controller for creating a new book
const createBook = async (req, res) => {
  try {
    // Extract book data from the request body
    const { title, coverImage, startDate, endDate, status, feeling, rating, review } = req.body;

    // Create a new book instance
    const newBook = new Book({
      title,
      coverImage,
      startDate,
      endDate,
      status,
      feeling,
      rating,
      review,
    });

    // Save the new book to the database
    const savedBook = await newBook.save();

    // Respond with the saved book data
    res.json(savedBook);
  } catch (error) {
    // Handle any errors that occurred during book creation
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createBook,
  // Add other controller functions as needed
};
