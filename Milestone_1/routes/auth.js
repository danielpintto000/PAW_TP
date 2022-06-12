//Imports necessários para a rota auth
var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController');

//Rota de autentificação
router.post('/login' ,authController.login );

//Rota para registar um utilizador (user)
router.post('/register-user', authController.register);

//Rota para registar um funcionário (employee). Apenas o admin (administrador) o pode fazer
router.post('/register-employee', authController.verifyTokenAdmin, authController.register );
router.post('/register-admin', authController.verifyTokenAdmin, authController.register );
  
module.exports = router;