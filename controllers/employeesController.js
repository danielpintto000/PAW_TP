/**
 * Controller dos livros
 */

 var mongoose = require("mongoose");
 var Employees = require("../models/employees");
 
 //mostrar todos os funcionários
 
 EmployeesController.showAll = function (req, res) {
     Employees.find({})
       .populate("location") //não entendi
       .exec((err, dbitems) => {
         if (err) {
           console.log("Erro a ler");
           res.redirect("/error");
         } else {
           console.log(dbitems);
           res.render("employees/employeesList", { items: dbitems });
         }
       });
   };
 
 //adicionar um novo funcionário (GET)
 
 EmployeesController.createForm = function (req, res) {
     Location.find({}).exec((err, dbitems) => {
       if (err) {
         console.log("Erro a ler");
         res.redirect("/error");
       } else {
         console.log(dbitems);
         res.render("employees/createEmployees", { items: dbitems });
       }
     });
   };
 
 //adicionar um novo funcionário (POST)
 
 employeesController.create = function (req, res) {
    var employees = new Books (req.body);
    Employees.save((err) => {
      if (err) {
        console.log("Erro a gravar");
        res.redirect("/error");
      } else {
        res.redirect("/");
      }
    });
 };
 
 //editar um funcionário (FORM GET)
 
 employeesController.editForm = function (req, res) {
    Employees.findOne({ _id: req.params.id }).exec((err, dbitem) => {
       if (err) {
         console.log("Erro a ler");
         res.redirect("/error");
       } else {
         res.render("employees/employeesEdit", { item: dbitem });
       }
     });
   };
 
 //editar um funcionário (POST)
 
 employeesController.edit = function (req, res) {
    Employees.findByIdAndUpdate(req.body._id, req.body, (err, editedItem) => {
       if (err) {
         console.log("Erro a gravar");
         res.redirect("/error");
       } else {
         res.redirect("/employees/show/" + req.body._id);
       }
     });
   };
 
   //apagar um funcionário
 
   employeesController.delete = function (req, res) {
    Employees.remove({ _id: req.params.id }).exec((err) => {
       if (err) {
         console.log("Erro a ler");
       } else {
         res.redirect("/employees");
       }
     });
 };