// controllers/bookController.js
const Book = require('./models/book'); // Import your Book model


// Controller for creating a new book with form data and file upload
const createBook = async (req, res) => {
  try {
    // Extract book data from the request body
    const { title, startDate, endDate, status, feeling, rating, review } = req.body;

    // Access the file (coverImage) from the request
    const { coverImage } = req.files;

    // Create a new book instance
    const newBook = new Book({
      title,
      startDate,
      endDate,
      status,
      feeling,
      rating,
      review,
    });

    // Handle the cover image separately, assuming coverImage is a Buffer
    newBook.coverImage.data = coverImage.data;
    newBook.coverImage.contentType = coverImage.mimetype;

    // Save the new book to the database
    const savedBook = await newBook.save();

    // Respond with the saved book data
    res.json(savedBook);
  } catch (error) {
    // Handle any errors that occurred during book creation
    console.error('Error creating book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Controller for getting all books
const getAllBooks = async (req, res) => {
  try {
    // Retrieve all books from the database
    const books = await Book.find();

    // Respond with the list of books
    res.json(books);
  } catch (error) {
    // Handle any errors that occurred during retrieval
    console.error('Error getting books:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller for getting a specific book by ID
const getBookById = async (req, res) => {
  try {
    // Extract book ID from the request parameters
    const { id } = req.params;

    // Retrieve the book with the specified ID from the database
    const book = await Book.findById(id);

    // Check if the book was found
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Respond with the book data
    res.json(book);
  } catch (error) {
    // Handle any errors that occurred during retrieval
    console.error('Error getting book by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller for updating a book by ID
const updateBookById = async (req, res) => {
  try {
    // Extract book ID and updated data from the request parameters and body
    const { id } = req.params;
    const { title, startDate, endDate, status, feeling, rating, review } = req.body;

    // Retrieve the book with the specified ID from the database
    const book = await Book.findById(id);

    // Check if the book was found
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Update the book data
    book.title = title;
    book.startDate = startDate;
    book.endDate = endDate;
    book.status = status;
    book.feeling = feeling;
    book.rating = rating;
    book.review = review;

    // Save the updated book to the database
    const updatedBook = await book.save();

    // Respond with the updated book data
    res.json(updatedBook);
  } catch (error) {
    // Handle any errors that occurred during update
    console.error('Error updating book by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller for deleting a book by ID
const deleteBookById = async (req, res) => {
  try {
    // Extract book ID from the request parameters
    const { id } = req.params;

    // Delete the book with the specified ID from the database
    const deletedBook = await Book.findByIdAndDelete(id);

    // Check if the book was found and deleted
    if (!deletedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Respond with the deleted book data
    res.json(deletedBook);
  } catch (error) {
    // Handle any errors that occurred during deletion
    console.error('Error deleting book by ID:', error);
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
