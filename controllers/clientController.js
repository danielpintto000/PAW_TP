/**
* Controller dos Clientes
*/

var mongoose = require("mongoose");
var Client = require("../models/client");

var clientController = {};
 
//mostrar todos os Clientes
clientController.showAll = function (req, res) {
  Client.find({}).exec((err, dbitems) => {
    if (err) {
      console.log("Error:", err);
      res.redirect("/error");
    } else {
      console.log(dbitems);
      res.render("client/clientList", {items: dbitems});
    }
  });
};
 
//mostrar um Cliente em especifico
clientController.show = function (req, res) {
  Client.findOne({ _id: req.params.id }).exec((err, dbitem) => {
    if (err) {
      console.log("Erro a ler");
      res.redirect("/error");
    } else {
      res.render("client/clientDetails", { item: dbitem });
    }
  });
};

//adicionar um novo Cliente (GET)
clientController.createForm = function (req, res) {
  console.log("controller1");
  res.render("client/createClient");
};

//adicionar um novo Cliente (POST)
clientController.create = function (req, res) {
  var client = new Client (req.body);

  client.save((err) => {
    if (err) {
      console.log("Erro a gravar");
      res.redirect("/error");
    } else {
      res.redirect("/");
    }
  });
};
 
//editar um Cliente (FORM GET)
clientController.editForm = function (req, res) {
  Client.findOne({ _id: req.params.id }).exec((err, dbitem) => {
    if (err) {
      console.log("Erro a ler");
      res.redirect("/error");
    } else {
      res.render("client/clientEdit", { item: dbitem });
    }
  });
};
 
//editar um Cliente (POST)
clientController.edit = function (req, res) {
  Client.findByIdAndUpdate(req.body._id, req.body, (err, editedItem) => {
    if (err) {
      console.log("Erro a gravar");
      res.redirect("/error");
    } else {
      res.redirect("/clients/show/" + req.body._id);
    }
  });
};
 
//apagar um Cliente
clientController.delete = function (req, res) {
  Client.remove({ _id: req.params.id }).exec((err) => {
    if (err) {
      console.log("Erro a ler");
    } else {
      res.redirect("/clients");
    }
  });
};

module.exports = clientController;