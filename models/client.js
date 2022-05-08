var mongoose = require("mongoose");
const db = require("../db");

var clientSchema = new mongoose.Schema({
  name: {type: String, required:true, unique:true},
  address: {type: String, required: true, unique: true},
  email: {type: String, required:true, unique: true},
});

module.exports = mongoose.model("Client", clientSchema);