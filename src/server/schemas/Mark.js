const mongoose = require('mongoose');

const MarkSchema = mongoose.Schema({
  value: Number,
  weight: Number,
  date: String
});

module.exports = MarkSchema;