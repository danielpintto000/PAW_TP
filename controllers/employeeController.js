/**
* Controller dos funcionários
*/

var mongoose = require("mongoose");
var Employee = require("../models/employee");

var employeeController = {};
 
//mostrar todos os funcionários
employeeController.showAll = function (req, res) {
  Employee.find({}).exec((err, dbitems) => {
    if (err) {
      console.log("Error:", err);
      res.redirect("/error");
    }
    else {
      console.log(dbitems);
      res.render("employee/employeeList", {items: dbitems});
    }
  });
};
 
//mostrar um funcionário em especifico
employeeController.show = function (req, res) {
  Employee.findOne({ _id: req.params.id }).exec((err, dbitem) => {
    if (err) {
      console.log("Erro a ler");
      res.redirect("/error");
    } else {
      res.render("employee/employeeDetails", { item: dbitem });
    }
  });
};

//adicionar um novo funcionário (GET)
employeeController.createForm = function (req, res) {
  Employee.find({}).exec((err, dbitems) => {
    if (err) {
      console.log("Erro a ler");
      res.redirect("/error");
    } else {
      console.log(dbitems);
      res.render("admin/employees/createEmployee", { items: dbitems });
    }
  });
};
 
//adicionar um novo funcionário (POST)
employeeController.create = function (req, res) {
  var employee = new Employee (req.body);
  console.log(employee.password);

  employee.save((err) => {
    if (err) {
      console.log("Erro a gravar");
      res.redirect("/error");
    } else {
      res.redirect("/admins/employees");
    }
  });
};
 
//formulario para fazer login
employeeController.logForm = function (req, res) {
  res.render("employee/log");
};

//login em especifico
employeeController.log = function (req, res) {
  let _username = req.body.username;

  if (_username == "admin" && req.body.password == "admin") { //fazer login como admin
    res.redirect("/admins");
  } else {
    Employee.findOne({ username: _username }).exec((err, dbitem) => { //procurar um funcionario com o username dado
      if (err || dbitem == null) {
        console.log("Erro a ler");
        res.redirect("/error");
      } else if (dbitem.username == _username) {
        if (dbitem.password == req.body.password) { //confirmar password
          console.log("Correct");
          res.redirect("/employees");
        }
      }
    });
  }
};
 
//editar um funcionário (FORM GET)
employeeController.editForm = function (req, res) {
  Employee.findOne({ _id: req.params.id }).exec((err, dbitem) => {
    if (err) {
      console.log("Erro a ler");
      res.redirect("/error");
    } else {
      res.render("employee/employeeEdit", { item: dbitem });
    }
  });
};
 
//editar um funcionário (POST)
employeeController.edit = function (req, res) {
  Employee.findByIdAndUpdate(req.body._id, req.body, (err, editedItem) => {
    if (err) {
      console.log("Erro a gravar");
      res.redirect("/error");
    } else {
      res.redirect("/employees/show/" + req.body._id);
    }
  });
};
 
//apagar um funcionário
employeeController.delete = function (req, res) {
  Employee.remove({ _id: req.params.id }).exec((err) => {
    if (err) {
      console.log("Erro a ler");
    } else {
      res.redirect("/employees");
    }
  });
};

module.exports = employeeController;