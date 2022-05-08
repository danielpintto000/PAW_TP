var express = require("express");
var router = express.Router();
var adminController = require("../controllers/adminController");

//multer
let multer = require("multer");
let DIR = "./uploads/";

router.get("/", adminController.mainPage);

//Employee
router.get("/employees/", adminController.showAllEmployees);
router.get("/employees/show/:id", adminController.showEmployee);

router.get("/employees/create", adminController.createFormEmployee);
router.post("/employees/create", adminController.createEmployee);

router.post("/employees/edit/:id", adminController.editEmployee);
router.get("/employees/edit/:id", adminController.editFormEmployee);

router.get("/employees/delete/:id", adminController.deleteEmployee);

//books
router.get("/books", adminController.showAllBooks);
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
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
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

router.get("/books/edit/:id", adminController.editFormBook);

router.post("/books/edit/:id", upload.single("cover"), (req, res, next) => {
  console.log(req.file);
  
  adminController.editBook(req, res, next);
});
//===================================
//MULTER
//===================================

router.get("/books/delete/:id", adminController.deleteBook);

//clients
router.get("/clients", adminController.showAllClients);
router.get("/clients/show/:id", adminController.showClient);

router.get("/clients/create", adminController.createFormClient);
router.post("/clients/create", adminController.createClient);

router.post("/clients/edit/:id", adminController.editClient);
router.get("/clients/edit/:id", adminController.editFormClient);

router.get("/clients/delete/:id", adminController.deleteClient);

module.exports = router;