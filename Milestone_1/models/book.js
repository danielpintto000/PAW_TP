//Imports necessários para o modelo do objeto livro (book)
var mongoose = require("mongoose");
const db = require("../db");

//Modelo do objeto livro (book)
var bookSchema = new mongoose.Schema({
  //Nome do livro (book). Informação obrigatória
  name: {
    type: String,
    required: true,
  },
  //Autor do livro (book). Informação obrigatória
  author: {
    type: String,
    required: true,
  },
  //ISBN do livro (book). Informação obrigatória
  isbn: {
    type: Number,
    required: true,
  },
  //Descrição do livro (book)
  description: {
    type: String,
    required: false,
  },
  //Estado do livro (book), novo (new) ou usado (used). Informação obrigatória
  state: {
    type: String,
    required: true,
  },
  //Stock do livro (book). Informação obrigatória
  stock: {
    type: Number,
    required: true,
  },
  //Capa do livro (book)
  cover: String,
  //Preço do livro (book). Informação obrigatória
  price: {
    type: String,
    required: true,
  },
});
  
module.exports = mongoose.model("Book", bookSchema);