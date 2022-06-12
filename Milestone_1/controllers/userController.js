//Controller dos Users, que podem
var mongoose = require("mongoose");
 var User = require("../models/user");
 var Books = require("../models/book");
 const { register } = require("./authController");
 
 var userController = {};
 
 //Apresentar todos os utilizadores
 userController.showAll = function (req, res, next) {
   User.find({ role: "USER" }).exec((err, dbitems) => {
     //Se ocorrer um erro
     if (err) {
       //Apresentar mensagem de erro na consola
       console.log("Erro a ler");
       next(err);
     } else {
       console.log(dbitems);
       res.json(dbitems);
     }
   });
 };

//Apresentar uma lista com todos os livros (books)
userController.showAllBooks = function (req, res, next) {
   Books.find({ userId: req.params.id }).populate("bookId").exec((err, dbitems) => {
     //Se ocorrer um erro
     if (err) {
       //Apresentar mensagem de erro na consola
       console.log("Erro a ler");
       next(err);
     } else {
       console.log(dbitems);
       res.json(dbitems);
     }
   });
 };
 
//Criar um livro
 userController.addBook = function (req, res, next) {
   console.log(req.body);
   var book = new Books();
 
   var url =
   req.protocol +
   "://" +
   req.get("host") +
   "/uploads/" +
   req.body.file;

   book.bookId = req.body.bookId;
   book.userId = req.body.userId;
   book.file = url;
 
   console.log(book);
 
   book.save((err) => {
     if(err){
       next(err);
     } else {
       res.json(book);
     }
   })
 };
 
 //Apagar um livro
 userController.deleteBook = function (req, res, next) {
   Books.deleteOne({ _id: req.params.id }).exec((err, deletedbook) => {
     //Se ocorrer um erro
     if (err) {
       //Apresentar mensagem de erro na consola
       console.log("Erro a ler");
       next(err);
     } else {
       res.json(deletedbook);
     }
   });
 };
 
 //mostrar um user em especifico
 userController.show = function (req, res, next) {
   User.findOne({ _id: req.params.id }).exec((err, dbitem) => {
     //Se ocorrer um erro
     if (err) {
       //Apresentar mensagem de erro na consola
       console.log("Erro a ler");
       next(err);
     } else {
       res.json(dbitem);
     }
   });
 };
 
 //criar um user (POST)
 userController.create = function (req, res, next) {
   var user = new User(req.body);
   user.role = "USER";
   //register(req.body.name,req.body.email,"password","EMPLOYEE");
 
   employee.save((err) => {
     //Se ocorrer um erro
     if (err) {
       //Apresentar mensagem de erro na consola
       console.log("Erro a gravar");
       next(err);
     } else {
       res.json(employee);
     }
   });
 };
 
 //editar um user (POST)
 userController.edit = function (req, res, next) {
   User.findByIdAndUpdate(req.body._id, req.body, (err, editedEmployee) => {
     //Se ocorrer um erro
     if (err) {
       //Apresentar mensagem de erro na consola
       console.log("Erro a gravar");
       next(err);
     } else {
       res.json(editedEmployee);
     }
   });
 };
 
 //apagar um user
 userController.delete = async function (req, res, next) {
   try {
     const result = await Books.find({userId: req.params.id});
 
     if(result.length>0){
       Books.deleteMany({ userId: req.params.id }).exec((err) => {
         if (err) {
           next(err);
         }
       });
     } else {
       //Apresentar mensagem de erro na consola
       console.log("erro");
     }
 
     User.deleteOne({ _id: req.params.id }).exec((err, deletedUser) => {
       if (err) {
         next(err);
       } else {
         res.json(deletedUser);
       }
     });
 
   } catch (error) {
     //Apresentar mensagem de erro na consola
     console.log("erro");
   }
 };
 
 module.exports = userController;