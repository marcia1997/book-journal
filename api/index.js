const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(fileUpload());
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,
}));

// Set up multer storage for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// MongoDB connection
mongoose.connect("mongodb+srv://marciadenisevazquez:1234@cluster-book-app.yy6jcgi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-book-app");

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// routes
const authRouter = require('./routes/auth.js');
const booksRouter = require('./routes/books.js');

app.use('/auth', authRouter);
app.use('/books', upload.single('coverImage'), booksRouter); 
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
