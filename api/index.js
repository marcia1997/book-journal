// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://marciadenisevazquez:1234@cluster-book-app.yy6jcgi.mongodb.net/?retryWrites=true&w=majority');

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

//routes
const authRouter = require('./routes/auth');
const booksRouter = require('./routes/books');

app.use('/auth', authRouter);
app.use('/books', booksRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
