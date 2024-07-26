const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, required: true },
  feeling: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  rating: { type: Number, required: true },
  review: { type: String, required: true },
  coverImage: { type: Buffer, contentType: String }, // Adjust as needed
});

module.exports = mongoose.model('Book', bookSchema);
