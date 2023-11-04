

const mongoose = require('mongoose');

const concatenationSchema = new mongoose.Schema({
    string1: String,
    string2: String,
    result: String,
  });
  const Concatenation = mongoose.model('Concatenation', concatenationSchema);

  module.exports = Concatenation;