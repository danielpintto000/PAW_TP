//Imports necessários para a rota de utilizadores (users)
var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");
let multer = require("multer");
const authController = require("../controllers/authController");
let DIR = "./uploads/";

//Apresentar uma lista com todos os utilizadores (users)
router.get("/", userController.showAll);

//Apresentar todos os livros (books)
router.get("/showbooks", authController.verifyTokenUser, userController.showAllBooks);

//Adicionar um livro (book)
router.post("/addBook", authController.verifyTokenUser, userController.addBook);

//Apagar livro
router.delete("/deletebook/:id", userController.deleteBook);

//Apresentar informação de um utilizador (user)
router.get("/show/:id", userController.show);

//Criar um utilizador (user)
router.post("/create", userController.create);

//Editar informação sobre o próprio
router.put("/edit/:id", userController.edit);

//Apagar informação sobre o próprio
router.delete("/delete/:id",userController.delete);

module.exports = router;
