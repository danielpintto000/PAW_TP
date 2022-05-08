var express = require("express");
var router = express.Router();
var employeeController = require("../controllers/employeeController");

router.get("/", employeeController.showAll);
router.get("/show/:id", employeeController.show);
router.get("/create", employeeController.createForm);
router.post("/create", employeeController.create);
//router.post("/edit/:id", employeeController.edit);
//router.get("/edit/:id", employeeController.editForm);
//router.get("/delete/:id", employeeController.delete);

router.get("/log", employeeController.logForm);
router.post("/log", employeeController.log);

module.exports = router;