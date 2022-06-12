//Imports necessários para a rota admin
var express = require("express");
var router = express.Router();
var adminController = require("../controllers/adminController");

//multer
let multer = require("multer");
let DIR = "./uploads/";

//Rota para a página inicial (main page)
router.get("/", adminController.mainPage);

//Mostrar uma lista com todos os funcionários (employees)
router.get("/employees/", adminController.showAllEmployees);

//Mostrar informação de um funcionário (employee)
router.get("/employees/show/:id", adminController.showEmployee);

router.get("/employees/create", adminController.createFormEmployee);
router.post("/employees/create", adminController.createEmployee);

router.post("/employees/edit/:id", adminController.editEmployee);
router.get("/employees/edit/:id", adminController.editFormEmployee);

//Apagar informação de um funcionário (employee)
router.get("/employees/delete/:id", adminController.deleteEmployee);

//Apresentar uma lista com todos os livros (books)
router.get("/books", adminController.showAllBooks);

//Apresentar informação de um livro (book)
router.get("/books/show/:id", adminController.showBook);

router.get("/books/create", adminController.createFormBook);

//===================================
//MULTER
//===================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = req.body.name + '-' + file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName);
  },
});

var upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 1024 * 1024 * 5
  // },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);

      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

router.post("/books/create", upload.single("cover"), (req, res, next) => {
  console.log(req.file);
  adminController.createBook(req, res, next);
});

//Rota para editr infomação relativa a um livro (book)
router.get("/books/edit/:id", adminController.editBook);

router.post("/books/edit/:id", upload.single("cover"), (req, res, next) => {
  console.log(req.file);
  adminController.editBook(req, res, next);
});
//===================================
//MULTER
//===================================

//Apagar informação relativa a um livro (book)
router.get("/books/delete/:id", adminController.deleteBook);

//Apresentar uma lista com todos os clientes (clients)
router.get("/clients", adminController.showAllClients);

//Apresentar informação relativa a um cliente (client)
router.get("/clients/show/:id", adminController.showClient);

router.get("/clients/create", adminController.createFormClient);
router.post("/clients/create", adminController.createClient);

router.post("/clients/edit/:id", adminController.editClient);
router.get("/clients/edit/:id", adminController.editFormClient);

//Apagar informação relativa a um cliente (client)
router.get("/clients/delete/:id", adminController.deleteClient);

module.exports = router;