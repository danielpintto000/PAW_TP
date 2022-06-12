//Imports necessários para a rota de livros (books)
var express = require("express");
const authController = require("../controllers/authController");
var router = express.Router();
var bookController = require("../controllers/bookController");

//multer
let multer = require("multer");
let DIR = "../uploads";

//Apresentar uma lista com todos os livros (books)
router.get("/", bookController.showAll);

//Apresentar informação relativa a um livro (book)
router.get("/show/:id", bookController.show);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = req.body.name + "-" + file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName);
  },
});
var upload = multer({
  storage: storage,

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

//Rota para criar um livro (book)
router.post("/create", upload.single('cover'),
  (req, res, next) => {
    bookController.create(req, res, next);
  },

  authController.verifyTokenAdminOrEmployee,
  bookController.create
);

router.get('/file', function(req, res) {
  res.render('fileForm');
});

router.post('/file_upload', function(req, res) {
  console.log(req.file);
  bookController.getSingleFile(req,res);
});

router.post('/file_upload_test', function(req, res) {
  console.log(req.file);
  bookController.getSingleFileTest(req,res);
});

//Rota para editar informação relativa a um livro (book)
router.put("/edit/:id", upload.single("cover"),
  (req, res, next) => {
    console.log(req.file);
    bookController.edit(req, res, next);
  },
  authController.verifyTokenAdminOrEmployee,
  bookController.edit
);

/*Apagar informação relativa a um livro (book). Apenas um funcionário (employee) ou admin (administrador) pode 
  aceder a esta rota*/
router.delete("/delete/:id", authController.verifyTokenAdminOrEmployee, bookController.delete);

module.exports = router;