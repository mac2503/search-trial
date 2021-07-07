const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
  title: String,
  url: String
});

module.exports = mongoose.model('Search', searchSchema);