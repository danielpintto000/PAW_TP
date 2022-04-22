/**
 * Controller dos livros
 */

var mongoose = require("mongoose");
var Books = require("../models/books");


//mostrar todos os livros

booksController.showAll = function (req, res) {
    Books.find({})
      .populate("location") //não entendi
      .exec((err, dbitems) => {
        if (err) {
          console.log("Erro a ler");
          res.redirect("/error");
        } else {
          console.log(dbitems);
          res.render("books/booksList", { items: dbitems });
        }
      });
  };

//adicionar um novo livro (GET)

booksController.createForm = function (req, res) {
    Books.find({}).exec((err, dbitems) => {
      if (err) {
        console.log("Erro a ler");
        res.redirect("/error");
      } else {
        console.log(dbitems);
        res.render("books/createBooks", { items: dbitems });
      }
    });
  };

//adicionar um novo livro (POST)

booksController.create = function (req, res) {
   var books = new Books (req.body);
   books.save((err) => {
     if (err) {
       console.log("Erro a gravar");
       res.redirect("/error");
     } else {
       res.redirect("/");
     }
   });
};

//editar um livroo (FORM GET)

booksController.editForm = function (req, res) {
    Books.findOne({ _id: req.params.id }).exec((err, dbitem) => {
      if (err) {
        console.log("Erro a ler");
        res.redirect("/error");
      } else {
        res.render("books/booksEdit", { item: dbitem });
      }
    });
  };

//editar um livro (POST)

booksController.edit = function (req, res) {
    Books.findByIdAndUpdate(req.body._id, req.body, (err, editedItem) => {
      if (err) {
        console.log("Erro a gravar");
        res.redirect("/error");
      } else {
        res.redirect("/books/show/" + req.body._id);
      }
    });
  };

  //apagar um livro

booksController.delete = function (req, res) {
    Books.remove({ _id: req.params.id }).exec((err) => {
      if (err) {
        console.log("Erro a ler");
      } else {
        res.redirect("/books");
      }
    });
};