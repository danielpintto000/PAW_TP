var express = require("express");
var router = express.Router();
var bookController = require("../controllers/bookController");

router.get("/", bookController.showAll);
router.get("/show/:id", bookController.show);

//router.get("/create", bookController.createForm);
//router.post("/create", bookController.create);

//router.post("/edit/:id", bookController.edit);
//router.get("/edit/:id", bookController.editForm);

//router.get("/delete/:id", bookController.delete);

module.exports = router;