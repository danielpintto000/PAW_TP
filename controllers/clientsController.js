/**
 * Controller dos livros
 */

 var mongoose = require("mongoose");
 var Clients = require("../models/clients");
  

 
 //mostrar todos os clientes
 
booksController.showAll = function (req, res) {
    Clients.find({})
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
 
 //adicionar um novo clientes (GET)
 
 clientsController.createForm = function (req, res) {
     Location.find({}).exec((err, dbitems) => {
       if (err) {
         console.log("Erro a ler");
         res.redirect("/error");
       } else {
         console.log(dbitems);
         res.render("clients/createclients", { items: dbitems });
       }
     });
   };
 
 //adicionar um novo clientes (POST)
 
 clientsController.create = function (req, res) {
    var books = new Clients (req.body);
    Clients.save((err) => {
      if (err) {
        console.log("Erro a gravar");
        res.redirect("/error");
      } else {
        res.redirect("/");
      }
    });
 };
 
 //editar um clientes (FORM GET)
 
 clientsController.editForm = function (req, res) {
     Clients.findOne({ _id: req.params.id }).exec((err, dbitem) => {
       if (err) {
         console.log("Erro a ler");
         res.redirect("/error");
       } else {
         res.render("clients/clientsEdit", { item: dbitem });
       }
     });
   };
 
 //editar um clientes (POST)
 
 clientsController.edit = function (req, res) {
     Clients.findByIdAndUpdate(req.body._id, req.body, (err, editedItem) => {
       if (err) {
         console.log("Erro a gravar");
         res.redirect("/error");
       } else {
         res.redirect("/clients/show/" + req.body._id);
       }
     });
   };
 
   //apagar um livro
 
 clientsController.delete = function (req, res) {
     Clients.remove({ _id: req.params.id }).exec((err) => {
       if (err) {
         console.log("Erro a ler");
       } else {
         res.redirect("/clients");
       }
     });
 };