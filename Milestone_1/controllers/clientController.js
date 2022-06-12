//Imports necessários para o controller do cliente (client)
var mongoose = require("mongoose");
var Client = require("../models/client");

var clientController = {};
 
//Apresentar uma lista com informação de todos os clientes (client)
clientController.showAll = function (req, res) {
  //Encontrar os clientes (clients)
  Client.find({}).exec((err, dbitems) => {
    //Se ocorrer um erro
    if (err) {
      //Apresenta mensagem de erro na consola
      console.log("Error:", err);

      //Apresentar página com o erro
      next(err);
    } else {
      console.log(dbitems);

      //Apresentar página com a lista
      res.json(dbitems)
      //res.render("client/clientList", {items: dbitems});
    }
  });
};
 
//Apresentar detalhes de um cliente (client)
clientController.show = function (req, res) {
  //Procurar um cliente (client)
  Client.findOne({ _id: req.params.id }).exec((err, dbitem) => {
    //Se ocorrer um erro
    if (err) {
      //Apresentar mensagem de erro na consola
      console.log("Erro a ler");

      //Apresentar página com o erro
      res.redirect("/error");
    } else {
      //Apresentar página com os detalhes
      res.json(dbitem);
      //res.render("client/clientDetails", { item: dbitem });
    }
  });
};

//adicionar um novo Cliente (GET)
/*clientController.createForm = function (req, res) {
  console.log("controller1");
  res.render("client/createClient");
};*/

//adicionar um novo Cliente (POST)
clientController.create = function (req, res) {
  var client = new Client (req.body);

  client.save((err) => {
    //Se ocorrer um erro
    if (err) {
      //Apresentar mensagem de erro na consola
      console.log("Erro a gravar");

      //Apresentar página com o erro
      res.redirect("/error");
    } else {
      res.json(client);
      //res.redirect("/");
    }
  });
};
 
//editar um Cliente (FORM GET)
/*clientController.editForm = function (req, res) {
  Client.findOne({ _id: req.params.id }).exec((err, dbitem) => {
    //Se ocorrer um erro
    if (err) {
      //Apresentar mensagem de erro na consola
      console.log("Erro a ler");

      //Apresentar página com o erro
      res.redirect("/error");
    } else {
      res.render("client/clientEdit", { item: dbitem });
    }
  });
};*/
 
//editar um Cliente (POST)
clientController.edit = function (req, res) {
  Client.findByIdAndUpdate(req.body._id, req.body, (err, editedItem) => {
    //Se ocorrer um erro
    if (err) {
      //Apresentar mensagem de erro na consola
      console.log("Erro a gravar");

      //Apresentar página com o erro
      res.redirect("/error");
    } else {
      res.json(editedClient)
      //res.redirect("/clients/show/" + req.body._id);
    }
  });
};
 
//Apagar informação relativa a um cliente (client)
clientController.delete = function (req, res) {
  Client.remove({ _id: req.params.id }).exec((err) => {
    //Se ocorrer um erro
    if (err) {
      //Apresentar mensgem de erro na consola
      next(err);
    } else {
      Client.deleteOne({ _id: req.params.id }).exec((err, deletedClient) => {
        if (err) {
          next(err);
        } else {
          res.json(deletedClient);
        }
      });
      //res.redirect("/clients");
    }
  });
};

module.exports = clientController;