const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());



// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});


// Routes
const authRouter = require('./routes/auth');
const booksRouter = require('./routes/books');
app.use('/auth', authRouter);
app.use('/api/books', booksRouter);

// Set up multer storage for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Log requests for debugging
app.use((req, res, next) => {
  console.log(`Received ${req.method} request at ${req.url}`);
  next();
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
