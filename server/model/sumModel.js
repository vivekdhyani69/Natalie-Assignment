const mongoose = require('mongoose');

const sumSchema = new mongoose.Schema({
  num1: {
    type: Number,
    required: true,
  },
  num2: {
    type: Number,
    required: true,
  },
  sum: {
    type: Number,
    required: true,
  },
});

const Sum = mongoose.model('Sum', sumSchema);

module.exports = Sum;
