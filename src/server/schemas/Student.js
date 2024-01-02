const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
  name: String,
  marks: [String]
});

module.exports = StudentSchema;