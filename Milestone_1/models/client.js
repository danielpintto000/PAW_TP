//Imports necessários para o modelo do objeto cliente (client)
var mongoose = require("mongoose");
const db = require("../db");

//Modelo do objeto cliente (client)
var clientSchema = new mongoose.Schema({
  //Nome do cliente (client). Informação obrigatória
  name: {type: String, required:true, unique:true},
  //Morada do cliente (client). Informação obrigatória
  address: {type: String, required: true, unique: true},
  //Email do cliente (client). Informação obrigatória
  email: {type: String, required:true, unique: true},
});

module.exports = mongoose.model("Client", clientSchema);