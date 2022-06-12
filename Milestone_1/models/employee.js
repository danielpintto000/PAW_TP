//Imports necessários para o modelo do objeto funcionário (employee)
var mongoose = require("mongoose");
const db = require("../db");

//Modelo do objeto funcionário (employee)
var employeeSchema = new mongoose.Schema({
  //Nome do funcionário (employee). Informação obrigatória
  name: { type: String, required: true },
  //Email do funcionário (employee). Informação obrigatória
  email: { type: String, required: true, unique: true},
  //Palavra passe (password) do funcionário (employee). Informação obrigatória
  password: {type: String, required: true, unique: true},
});

module.exports = mongoose.model("Employee", employeeSchema);