//Imports necessários para o controller dos funcionários (employees)
var mongoose = require("mongoose");
var Employee = require("../models/employee");
const {register} = require("./authController");

var employeeController = {};
 
//Apresentar uma lista com informação de todos os funcionários (employees)
employeeController.showAll = function (req, res) {
  Employee.find({role: "EMPLOYEE"}).exec((err, dbitems) => {
    //Se ocorrer um erro
    if (err) {
      //Apresentar mensagem de erro na consola
      console.log("Error:", err);

      //Apresentar página com o erro
      next(err);
    }
    else {
      console.log(dbitems);

      //Apresentar página com a lista
      res.json(dbitems);
      //res.render("employee/employeeList", {items: dbitems});
    }
  });
};
 
//Apresentar detalhes de um funcionário (employee)
employeeController.show = function (req, res, next) {
  Employee.findOne({ _id: req.params.id }).exec((err, dbitem) => {
    //Se ocorrer um erro
    if (err) {
      //Apresentar mensagem de erro na consola
      console.log("Erro a ler");

      //Apresentar página com o erro
      next(err);
    } else {
      //Apresentar página com os detalhes
      res.json(dbitem)
      //res.render("employee/employeeDetails", { item: dbitem });
    }
  });
};

//adicionar um novo funcionário (GET)
/*employeeController.createForm = function (req, res) {
  Employee.find({}).exec((err, dbitems) => {
    //Se ocorrer um erro
    if (err) {
      //Apresentar mensagem de erro na consola
      console.log("Erro a ler");

      //Apresentar página com o erro
      res.redirect("/error");
    } else {
      console.log(dbitems);

      //Apresentar página com o formulário
      res.render("admin/employees/createEmployee", { items: dbitems });
    }
  });
};*/
 
//adicionar um novo funcionário (POST)
employeeController.create = function (req, res) {
  var employee = new Employee (req.body);
  employee.role = "EMPLOYEE";

  console.log(employee.password);

  employee.save((err) => {
    //Se ocorrer um erro
    if (err) {
      //Apresentar mensagem de erro na consola
      console.log("Erro a gravar");

      //Apresentar página com o erro
      next(err);
    } else {
      res.json(employee);
      //res.redirect("/admins/employees");
    }
  });
};
 
//Formulario para fazer login
/*employeeController.logForm = function (req, res) {
  res.render("employee/log");
};*/

//Login em especifico
/*employeeController.log = function (req, res) {
  let _username = req.body.username;

  //Se o username (nome de utilizador) e a palavra passe (password) forem admin, fazer login como admin
  if (_username == "admin" && req.body.password == "admin") {
    res.redirect("/admins");
  } else {
    //Procurar um funcionário com o username (nome de utilizador) dado
    Employee.findOne({ username: _username }).exec((err, dbitem) => {
      //Se ocorrer um erro ou a base de dados esteja vazia
      if (err || dbitem == null) {
        //Apresentar mensagem de erro na consola
        console.log("Erro a ler");

        //Apresentar página com o erro
        res.redirect("/error");

        //Se o username (nome de utilizador) existir na base de dados
      } else if (dbitem.username == _username) {
        //Se a palavra passe (password) do item da base de dados for igual à introduzida
        if (dbitem.password == req.body.password) {
          //Apresentar mensagem de sucesso na consola
          console.log("Correct");
          res.redirect("/employees");
        }
      }
    });
  }
};*/
 
//Apresentar um formulário para editar informação acerca de um funcionário (employee) (FORM GET)
/*employeeController.editForm = function (req, res) {
  Employee.findOne({ _id: req.params.id }).exec((err, dbitem) => {
    //Se ocorrer um erro
    if (err) {
      //Apresentar mensagem de erro na consola
      console.log("Erro a ler");

      //Apresentar página com o erro
      res.redirect("/error");
    } else {
      //Apresentar página com o formulário
      res.render("employee/employeeEdit", { item: dbitem });
    }
  });
};*/
 
//editar um funcionário (POST)
employeeController.edit = function (req, res, next) {
  Employee.findByIdAndUpdate(req.body._id, req.body, (err, editedEmployee) => {
    //Se ocorrer um erro
    if (err) {
      //Apresentar mensagem de erro na consola
      console.log("Erro a gravar");

      //Apresentar página com o erro
      next(err);
    } else {
      res.json(editedEmployee)
      //res.redirect("/employees/show/" + req.body._id);
    }
  });
};
 
//Apagar dados relativos a um funcionário (employee)
employeeController.delete = function (req, res) {
  Employee.deleteOne({ _id: req.params.id }).exec((err, deletedEmployee) => {
    //Se ocorrer um erro
    if (err) {
      //Apresentar mensagem de erro na consola
      console.log("Erro a ler");
      next(err);
    } else {
      res.json(deletedEmployee);
      //res.redirect("/employees");
    }
  });
};

module.exports = employeeController;