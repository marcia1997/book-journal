const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true, // Allow credentials
}));

// Multer setup for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define Book model
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, required: true },
  feeling: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  rating: String,
  review: String,
  coverImage: {
    data: Buffer,
    contentType: String,
  },
});

const Book = mongoose.model('Book', bookSchema);

// Endpoint for creating a new book
app.post('/books', upload.single('coverImage'), async (req, res) => {
  try {
    const { title, status, feeling, startDate, endDate, rating, review } = req.body;
    const coverImage = req.file;

    if (!title || !status || !feeling || !startDate || !endDate || !coverImage) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newBook = new Book({
      title,
      status,
      feeling,
      startDate,
      endDate,
      rating,
      review,
      coverImage: {
        data: coverImage.buffer,
        contentType: coverImage.mimetype,
      },
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    console.error('Error saving book:', error);
    res.status(500).send('Failed to save book');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
