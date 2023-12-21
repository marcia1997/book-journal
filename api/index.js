const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer'); // Add this line

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Set up multer storage for file uploads
const storage = multer.memoryStorage(); // You can adjust the storage configuration based on your requirements
const upload = multer({ storage: storage });

// MongoDB connection
mongoose.connect('mongodb+srv://marciadenisevazquez:1234@cluster-book-app.yy6jcgi.mongodb.net/?retryWrites=true&w=majority');

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// routes
const authRouter = require('./routes/auth');
const booksRouter = require('./routes/books');

app.use('/auth', authRouter);
app.use('/books', upload.single('coverImage'), booksRouter); // Add upload.single middleware for 'coverImage'

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
