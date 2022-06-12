//Imports necessários para a rota de funcionários (employees)
var express = require("express");
var router = express.Router();
var employeeController = require("../controllers/employeeController");
const authController = require("../controllers/authController");

/*Apresentar lista com todos os funcionários (employees). Apenas o admin (administrador) ou um funcionário
    (employee) pode aceder a esta rota*/
router.get("/", authController.verifyTokenAdminOrEmployee, employeeController.showAll);

/*Apresentar informação relativa a um funcionário (employee). Apenas o admin (administrador) ou um funcionário
    (employee) pode aceder a esta rota*/
router.get("/show/:id", authController.verifyTokenAdminOrEmployee, employeeController.show);

//Criar um funcionário (employee). Apenas o admin (administrador) pode aceder a esta rota
router.post("/create", authController.verifyTokenAdmin, employeeController.create);

/*Editar informação relativa a um funcionário (employee). Apenas o admin (administrador) ou um funcionário
    (employee) pode aceder a esta rota*/
router.put("/edit/:id", authController.verifyTokenAdminOrEmployee, employeeController.edit);

/*Apagar informação relativa a um funcionário (employee). Apenas o admin (administrador) ou um funcionário
    (employee) pode aceder a esta rota*/
router.delete("/delete/:id", authController.verifyTokenAdminOrEmployee, employeeController.delete);

module.exports = router;