const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    name: String,
    students: [],
  },
);

module.exports = GroupSchema;