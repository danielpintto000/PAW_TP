var mongoose = require("mongoose");
const db = require("../db");

var employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  password: {type: String, required: true, unique: true},
});

module.exports = mongoose.model("Employee", employeeSchema);