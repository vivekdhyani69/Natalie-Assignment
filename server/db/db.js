const mongoose = require('mongoose');

// MongoDB Atlas connection URI
const mongoURI = 'mongodb+srv://vdhyani04:zr6NvnQiBqEqpKDd@cluster0.8djmp3b.mongodb.net/test?retryWrites=true&w=majority';

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch(err => {
  console.error('Error connecting to MongoDB Atlas:', err.message);
});

module.exports = mongoose;
