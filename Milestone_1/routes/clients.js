//Imports necessários para a rota de clientes (clients)
var express = require("express");
var router = express.Router();
var clientController = require("../controllers/clientController");
var authController = require("../controllers/authController");

//Apresentar uma lista com todos os clientes (clients)
router.get("/", clientController.showAll);

//Apresentar informação de um cliente (client)
router.get("/show/:id", clientController.show);

//Criar um cliente (client). Apenas um funcionário (employee) ou admin (administrador) pode aceder a esta rota
router.post("/create", authController.verifyTokenAdminOrEmployee, clientController.create);

/*Editar informação relativa a um cliente (client). Apenas um funcionário (employee) ou admin (administrador)
    pode aceder a esta rota*/
router.put("/edit/:id", authController.verifyTokenAdminOrEmployee, clientController.edit);

/*Apagar informação relativa a um cliente (client). Apenas um funcionário (employee) ou admin (administrador)
    pode aceder a esta rota*/
router.delete("/delete/:id", authController.verifyTokenAdminOrEmployee, clientController.delete);

module.exports = router;