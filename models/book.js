var mongoose = require("mongoose");
const db = require("../db");

var bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  isbn: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  cover: String,
});
  
module.exports = mongoose.model("Book", bookSchema);