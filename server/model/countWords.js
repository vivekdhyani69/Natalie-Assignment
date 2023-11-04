const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  filename: String,
  originalFilename: String,
  wordCount: Number,
});

const Upload = mongoose.model('Upload', uploadSchema);
module.exports = Upload;
