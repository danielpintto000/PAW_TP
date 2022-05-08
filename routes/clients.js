var express = require("express");
var router = express.Router();
var clientController = require("../controllers/clientController");

router.get("/", clientController.showAll);
router.get("/show/:id", clientController.show);
//router.get("/create", clientController.createForm);
//router.post("/create", clientController.create);
//router.post("/edit/:id", clientController.edit);
//router.get("/edit/:id", clientController.editForm);
//router.get("/delete/:id", clientController.delete);

module.exports = router;