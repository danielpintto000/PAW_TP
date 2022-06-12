//Imports necessários para o controller de autentificação
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../jwt_secret/config");
var mongoose = require("mongoose");
var user = require("../models/user");

var authController = {};
var role;

//Iniciar sessão (login)
authController.login = function (req, res) {
  //Procurar um utilizador (user)
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send("Error on the server.");

    //Caso o utilizador não exista
    if (!user) return res.status(404).send("No user found.");

    //Verificar se a palavra passe (password) é válida
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    //Se a palavra passe não é válida rejeitar o inicio de sessão
    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null });

    /*Se o utilizador (user) é encontrado e a palavra passe (password) válida, cria um token que expira em 24 
      horas*/
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400,
    });

    //Retorna a informação incluindo o token como JSON e autoriza a autentificação
    res.status(200).send({ auth: true, token: token });
  });
};

//Registar um utilizador (user)
authController.register = function (req, res) {
  var hashedPassword = bcrypt.hashSync(req.body.password);

  /*if (req.body.role !== "USER") {
    if (req.body.role !== "EMPLOYEE") {
      if (req.body.role !== "ADMIN") {
        console.log(req.body.name);
        console.log(req.body.email);
        console.log(req.body.password);
        console.log(req.body.role);
      }
    }
  }*/

  console.log(req.body.role);

  //Cria um utilizador (user) com um nome (name), email, palavra passe (password) e cargo (role)
  User.create(
    {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
    },
    function (err, user) {
      if (err) return res.status(500).json(err);

      //Se o utilizador (user) é registado sem erros, cria um token com validade de 24 horas
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400,
      });

      //Retorna a informação incluindo o token como JSON e autoriza a autentificação
      res.status(200).send({ auth: true, token: token });
    }
  );
};

//Verifica o token
authController.verifyToken = function (req, res, next) {
  //Verifica o header ou os parâmetros URL ou parâmetros post do token
  var token = req.headers["x-access-token"];

  //Se não for fornecido um token
  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  //Verifica o segredo (secret) e verifica exp
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err)
      //Se houver erro na autentificação do token
      return res.status(500).
        send({ auth: false, message: "Failed to authenticate token." });

    //Se estiver tudo bem, guarda para uso noutras rotas
    req.userId = decoded.id;

    next();
  });
};

//Verifica um token de um empregado (employee)
authController.verifyTokenEmployee = function (req, res, next) {
  //Verifica o header ou os parâmetros URL ou parâmetros post do token
  var token = req.headers["x-access-token"];

  //Se não for fornecido um token
  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  //Verifica o segredo (secret) e verifica exp
  jwt.verify(token, config.secret, function (err, decoded) {
    //Confirmar o cargo (role) de funcionário (employee)
    user.findOne({ _id: decoded.id }).exec((err, dbitem) => {
      if (err) {
        next(err);
      } else {
        if (err) {
          //Se houver erro na autentificação do token
          return res.status(500).send({ auth: false, message: "Failed to authenticate token" });
        } else if (dbitem.role !== "EMPLOYEE") {
          //Se o cargo do utilizador não é empregado (employee)
          return res.status(500).send({ auth: false, message: "Not Employee" });
        }

        //Se estiver tudo bem, guarda para uso noutras rotas
        req.userId = decoded.id;

        next();
      }
    });
  });
};

//Verifica um token de um admin (administrador)
authController.verifyTokenAdmin = function (req, res, next) {
  //Verifica o header ou os parâmetros URL ou parâmetros post do token
  var token = req.headers["x-access-token"];

  console.log(req.params.id);

  //Se não for fornecido um token
  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  //Verifica o segredo (secret) e verifica exp
  jwt.verify(token, config.secret, function (err, decoded) {
    //Confirmar o cargo (role) de admin
    user.findOne({ _id: decoded.id }).exec((err, dbitem) => {
      if (err) {
        next(err);
      } else {
        if (err) {
          //Se houver erro na autentificação do token
          return res.status(500).send({ auth: false, message: "Failed to authenticate token" });
        } else if (dbitem.role !== "ADMIN") {
          //Se o cargo do utilizador não é admin
          return res.status(500).send({ auth: false, message: "Not Admin" });
        }

        //Se estiver tudo bem, guarda para uso noutras rotas
        req.userId = decoded.id;

        next();
      }
    });
  });
};

//Verifica um token de um utilizador (user)
authController.verifyTokenUser = function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers["x-access-token"];
  console.log(req.params.id);

  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  // verifies secret and checks exp
  jwt.verify(token, config.secret, function (err, decoded) {
    //confirmar User role
    user.findOne({ _id: decoded.id }).exec((err, dbitem) => {
      if (err) {
        next(err);
      } else {
        if (err) {
          return res
            .status(500)
            .send({ auth: false, message: "Failed to authenticate token" });
        } else if (dbitem.role !== "USER") {
          return res.status(500).send({ auth: false, message: "Not User" });
        }
        req.userId = decoded.id;
        next();
      }
    });
  });
};

//Verifica um token de um funcionário (employee) ou admin (administrador)
authController.verifyTokenAdminOrEmployee = function (req,res,next) {
  //Verifica o header ou os parâmetros URL ou parâmetros post do token
  var token = req.headers["x-access-token"];

  console.log(req.params.id);

  //Se não for fornecido um token
  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  //Verifica o segredo (secret) e verifica exp
  jwt.verify(token, config.secret, function (err, decoded) {
    //Confirmar o cargo (role) de admin
    user.findOne({ _id: decoded.id }).exec((err, dbitem) => {
      if (err) {
        next(err);
      } else {
        if (err) {
          //Se houver erro na autentificação do token
          return res.status(500).send({ auth: false, message: "Failed to authenticate token" });
        } else if (dbitem.role === "ADMIN") {
          //Se o cargo do utilizador é admin
          return authController.verifyTokenAdmin(req,res,next);
        } else if (dbitem.role === "EMPLOYEE") {
          //Se o cargo do utilizador é funcionário (employee)
          return authController.verifyTokenEmployee(req,res,next);
        } else {
          //Se o cargo do utilizador não é admin nem funcionário (employee)
          return res.status(500).send({ auth: false, message: "Not Employee Or Admin" });
        }

        //Se estiver tudo bem, guarda para uso noutras rotas
        req.userId = decoded.id;
        
        next();
      }
    });
  });
};

module.exports = authController;
