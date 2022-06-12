//Imports necessários para o controller dos livros (book)
var mongoose = require("mongoose");
var Book = require("../models/book");
var path = require("path");
var fs = require("fs");

var bookController = {};
 
//Apresentar uma lista com informação de todos os livros (book)
bookController.showAll = function (req, res) {
  //Encontrar os livros (book) 
  Book.find({}).exec((err, dbitems) => {
    //Se ocorrer um erro
    if (err) {
      //Apresentar mensagem de erro na consola
      console.log("Erro a ler");

      //Apresentar página com o erro
      next(err);
    } else {
      console.log(dbitems);

      //Apresentar JSON com a lista
      res.json(dbitems);
      //res.render("book/bookList", { items: dbitems });
    }
  });

};

//Apresentar os detalhes de um livro (book)
bookController.show = function (req, res) {
  //Procurar um livro (book)
  Book.findOne({ _id: req.params.id }).exec((err, dbitem) => {
    //Se ocorrer um erro
    if (err) {
      //Apresentar mensagem de erro na consola
      console.log("Erro a ler");

      //Apresentar página com o erro
      res.redirect("/error");
    } else {
      //Apresentar JSON com os detalhes
      res.json(dbitem);
      //res.render("book/bookDetails", { item: dbitem });
    }
  });
};
 
//adicionar um novo livro (GET)
/*bookController.createForm = function (req, res) {
    Book.find({}).exec((err, dbitems) => {
      //Se ocorrer um erro
      if (err) {
        //Apresentar mensagem de erro na consola
        console.log("Erro a gravar");

        //Apresentar página com o erro
        res.redirect("/error");
      } else {
        console.log(dbitems);

        //Apresentar página com o formulário
        res.render("book/createBook", { items: dbitems });
      }
    });
}; */
 
//Adicionar um novo livro (POST)
bookController.create = function (req, res, next) {
  console.log("cover: " + req.body.cover);
  console.log("price: " + req.body.price);

  var url = req.protocol + "://" + req.get("host") + "/uploads/" + req.body.cover.substring(12);

  console.log(url);
  
  //Cria um livro (book) com as informações passadas no body do pedido (req)
  Book.create(
    {
      name: req.body.name,
      author: req.body.author,
      isbn: req.body.isbn,
      description: req.body.description,
      state: req.body.state,
      stock: req.body.stock,
      price: req.body.price,
      cover: url,
    },
    (err) => {
      if (err) {
        console.log(err);
        next(err);
      } else {
        res.json();
      }
    }
  );
};
 
//editar um livroo (FORM GET)
/*bookController.editForm = function (req, res) {
  Book.findOne({ _id: req.params.id }).exec((err, dbitem) => {
    //Se ocorrer um erro
    if (err) {
      //Apresentar mensagem de erro na consola
      console.log("Erro a ler");

      //Apresentar página com o erro
      res.redirect("/error");
    } else {
      //Apresentar página com o formulário
      res.render("book/bookEdit", { item: dbitem });
    }
  });
};*/
 
//editar um livro (POST) 
bookController.edit = function (req, res) {
  //if (typeof req.body.url !== "undefined") {
    var url = req.protocol + "://" + req.get("host") + "/uploads/" + req.body.cover.substring(12);
  /*com cover. Procura um livro (book) por ID e atualiza as informações do mesmo com informação passada no body
    do pedido POST (req)*/
  Book.findByIdAndUpdate(
    req.body._id,
    {
      name: req.body.name,
      author: req.body.author,
      isbn: req.body.isbn,
      description: req.body.description,
      state: req.body.state,
      stock: req.body.stock,
      price: req.body.price,
      cover: url,
    },
    (err, editedBook) => {
      if (err) {
        console.log(err);
        next(err);
      } else {
        res.json(editedBook);
      }
    }
  );
  //sem cover
  /*} else {
    Book.findByIdAndUpdate(req.body._id, req.body, (err, editedBook) => {
      if (err) {
        console.log(err);
        next(err);
      } else {
        res.json(editedBook);
      }
    });
  }*/
};
 
//Apagar informação relativa a um livro (book)
bookController.delete = function (req, res) {
  Book.remove({ _id: req.params.id }).exec((err) => {
    //Se ocorrer um erro
    if (err) {
      //Apresentar mensagem de erro na consola
      console.log("Erro a ler");
    } else {
      res.redirect("/books");
    }
  });
};

//Obter ficheiro para a capa do livro (book)
bookController.getSingleFile = function (req, res, next) {
  console.log(req.file);
  let response = {};
  var fileDestination = path.join(__dirname, "..", "uploads", req.file.filename
  );

  fs.readFile(req.file.path, function (err, data) {
    fs.writeFile(fileDestination, data, function (err) {
      if (err) {
        console.log(err);
      } else {
        response = {
          message: "File uploaded successfully",
          filename: req.file.name,
        };
      }
      res.end(JSON.stringify(response));
    });
  });
};

bookController.getSingleFileTest = function (req, res, next) {
  console.log(req.file);
  let response = {};
  var fileDestination = path.join(__dirname, "..", "uploads","teste", req.file.filename
  );

  fs.readFile(req.file.path, function (err, data) {
    fs.writeFile(fileDestination, data, function (err) {
      if (err) {
        console.log(err);
      } else {
        response = {
          message: "File uploaded successfully",
          filename: req.file.name,
        };
      }
      res.end(JSON.stringify(response));
    });
  });
};

module.exports = bookController;