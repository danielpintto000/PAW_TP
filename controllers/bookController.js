/**
* Controller dos livros
*/
var mongoose = require("mongoose");
var Book = require("../models/book");

var bookController = {};
 
//mostrar todos os livros
bookController.showAll = function (req, res) {
  Book.find({}).exec((err, dbitems) => {
    if (err) {
      console.log("Erro a ler");
      res.redirect("/error");
    } else {
      console.log(dbitems);
      res.render("book/bookList", { items: dbitems });
    }
  });

};

//mostrar um livro em especifico
bookController.show = function (req, res) {
  Book.findOne({ _id: req.params.id }).exec((err, dbitem) => {
    if (err) {
      console.log("Erro a ler");
      res.redirect("/error");
    } else {
      res.render("book/bookDetails", { item: dbitem });
    }
  });
};
 
//adicionar um novo livro (GET)
bookController.createForm = function (req, res) {
    Book.find({}).exec((err, dbitems) => {
      if (err) {
        console.log("Erro a gravar");
        res.redirect("/error");
      } else {
        console.log(dbitems);
        res.render("book/createBook", { items: dbitems });
      }
    });
};
 
//adicionar um novo livro (POST)
bookController.create = function (req, res) {
    var book = new Book (req.body);
    
    book.save((err) => {
      if (err) {
        console.log("Erro a gravar");
        res.redirect("/error");
      } else {
        res.redirect("/");
      }
    });
};
 
//editar um livroo (FORM GET)
bookController.editForm = function (req, res) {
  Book.findOne({ _id: req.params.id }).exec((err, dbitem) => {
    if (err) {
      console.log("Erro a ler");
      res.redirect("/error");
    } else {
      res.render("book/bookEdit", { item: dbitem });
    }
  });
};
 
//editar um livro (POST) 
bookController.edit = function (req, res) {
  Book.findByIdAndUpdate(req.body._id, req.body, (err, editedItem) => {
    if (err) {
      console.log("Erro a gravar");
      res.redirect("/error");
    } else {
      res.redirect("/books/show/" + req.body._id);
    }
  });
};
 
//apagar um livro
bookController.delete = function (req, res) {
  Book.remove({ _id: req.params.id }).exec((err) => {
    if (err) {
      console.log("Erro a ler");
    } else {
      res.redirect("/books");
    }
  });
};

module.exports = bookController;