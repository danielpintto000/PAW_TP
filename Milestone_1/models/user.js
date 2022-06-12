//Imports necessários para o modelo do objeto utilizador (user)
var mongoose = require("mongoose");
const db = require("../db");

//Modelo do objeto utilizador (user)
var userSchema = new mongoose.Schema({
  //Nome do utilizador (user). Informação obrigatória
  name: { type: String, required: true },
  //Email do utilizador (user). Informação obrigatória e única
  email: { type: String, required: true, unique: true},
  //Palavra passe (password) do utilizador (user). Informação obrigatória
  password: { type: String, required: true },
  //Cargo (role) do utilizador (user). Informação obrigatória
  role: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
