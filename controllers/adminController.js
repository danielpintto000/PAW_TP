/**
 * Controller dos admins que podem criar/editar/remover bookos/localizações/promotores/B
 */

var mongoose = require("mongoose");
var Employee = require("../models/employee");
var Book = require("../models/book");
var Client = require("../models/client");

var adminController = {};

//Criar a main page do admin
adminController.mainPage = function (req, res) {
    console.log("controller1");
    res.render("admin/admin");
};
 
/*
book.remove({}, function(err) { 
    console.log('collection removed') 
});*/
 
//SHOW ALL
//employee
adminController.showAllEmployees = function (req, res) {
    Employee.find({}).exec((err, dbitems) => {
        if (err) {
            console.log("Erro a ler");
            res.redirect("/error");
        } else {
            console.log(dbitems);
            res.render("admin/employees/employeeList", { items: dbitems });
        }
   });
};

//book
adminController.showAllBooks = function (req, res) {
    Book.find({}).exec((err, dbitems) => {
        if (err) {
            console.log("Erro a ler");
            res.redirect("/error");
        } else {
            console.log(dbitems);
            res.render("admin/books/bookList", { items: dbitems });
        }
    });
};

//client
adminController.showAllClients = function (req, res) {
    Client.find({}).exec((err, dbitems) => {
        if (err) {
            console.log("Erro a ler");
            res.redirect("/error");
        } else {
            console.log(dbitems);
            res.render("admin/clients/clientList", { items: dbitems });
        }
    });
};

//SHOW ONE
//employee
adminController.showEmployee = function (req, res) {
    Employee.findOne({ _id: req.params.id }).exec((err, dbitem) => {
        if (err) {
            console.log("Erro a ler");
            res.redirect("/error");
        } else {
            res.render("admin/employees/employeeDetails", { item: dbitem });
        }
    });
};

//book
adminController.showBook = function (req, res) {
    Book.findOne({ _id: req.params.id }).exec((err, dbitem) => {
        if (err) {
            console.log("Erro a ler");
            res.redirect("/error");
        } else {
            res.render("admin/books/bookDetails", { item: dbitem });
        }
    });
};

//client
adminController.showClient = function (req, res) {
    Client.findOne({ _id: req.params.id }).exec((err, dbitem) => {
        if (err) {
            console.log("Erro a ler");
            res.redirect("/error");
        } else {
            res.render("admin/clients/clientDetails", { item: dbitem });
        }
    });
};

// CREATE 1 (FORM GET)
//employee
adminController.createFormEmployee = function (req, res) {
    console.log("controller1");
    res.render("admin/employees/createEmployee");
};

//book
adminController.createFormBook = function (req, res) {
    Book.find({}).exec((err, dbitems) => {
        if (err) {
            console.log("Erro a ler");
            res.redirect("/error");
        } else {
            console.log(dbitems);
            res.render("admin/books/createBook", { items: dbitems });
        }
    });
};

//client
adminController.createFormClient = function (req, res) {
    console.log("controller1");
    res.render("admin/clients/createClient");
};

// CREATE employee (POST)
//employee
adminController.createEmployee = function (req, res) {
    var employee = new Employee(req.body);
    employee.save((err) => {
        if (err) {
            console.log("Erro a gravar");
            res.redirect("/error");
        } else {
            res.redirect("/admins/employees");
        }
    });
};

//book
adminController.createBook = function (req, res, next) {
    //obter path do uploads
    const url = req.protocol + "://" + req.get("host") + "/uploads/" + req.file.filename;

    Book.create(
        {
            name: req.body.name,
            author: req.body.author,
            isbn: req.body.isbn,
            description: req.body.description,
            state: req.body.state,
            stock: req.body.stock,
            cover: url,
        },
        (err) => {
            if (err) {
                console.log(err);
                next(err);
            } else {
                res.redirect("/admins/books");
            }
        }
   );
};
 
//client
adminController.createClient = function (req, res) {
    var client = new Client(req.body);
    
    client.save((err) => {
        if (err) {
            console.log("Erro a gravar");
            res.redirect("/error");
        } else {
            res.redirect("/admins/clients");
        }
    });
};

//EDITAR 1 (FORM GET)
//employee
adminController.editFormEmployee = function (req, res) {
    Employee.findOne({ _id: req.params.id }).exec((err, dbitem) => {
        if (err) {
            console.log("Erro a ler");
            res.redirect("/error");
        } else {
            res.render("admin/employees/employeeEdit", { item: dbitem });
        }
    });
};

//book
adminController.editFormBook = function (req, res) {
    Book.findOne({ _id: req.params.id }).exec((err, dbitem) => {
        if (err) {
            console.log("Erro a ler");
            res.redirect("/error");
        } else {
            res.render("admin/books/bookEdit", { item: dbitem });
        }
    });
};

//client
adminController.editFormClient = function (req, res) {
    Client.findOne({ _id: req.params.id }).exec((err, dbitem) => {
        if (err) {
            console.log("Erro a ler");
            res.redirect("/error");
        } else {
            res.render("admin/clients/clientEdit", { item: dbitem });
        }
    });
};

// EDITAR 1 (POST)
//employee
adminController.editEmployee = function (req, res) {
    Employee.findByIdAndUpdate(req.body._id, req.body, (err, editedItem) => {
        if (err) {
            console.log("Erro a gravar");
            res.redirect("/error");
        } else {
            res.redirect("/admins/employees/show/" + req.body._id);
        }
    });
};

//book
adminController.editBook = function (req, res, next) {
    if (typeof req.file !== "undefined") {
        const url = req.protocol + "://" + req.get("host") + "/uploads/" + req.file.filename;

        //com capa
        Book.findByIdAndUpdate(
        req.body._id,
            {
                name: req.body.name,
                author: req.body.author,
                isbn: req.body.isbn,
                description: req.body.description,
                state: req.body.state,
                stock: req.body.stock,
                cover: url,
            },
            (err) => {
                if (err) {
                    console.log(err);
                    next(err);
                } else {
                    res.redirect("/admins/books/show/" + req.body._id);
                }
            }
        );
    //sem capa
    } else {
        book.findByIdAndUpdate(
            req.body._id,
                {
                    name: req.body.name,
                    author: req.body.author,
                    isbn: req.body.isbn,
                    description: req.body.description,
                    state: req.body.state,
                    stock: req.body.stock,
                },
                (err) => {
                    if (err) {
                        console.log(err);
                        next(err);
                    } else {
                        res.redirect("/admins/books/show/" + req.body._id);
                    }
                }
        );
   }
};

//client
adminController.editClient = function (req, res) {
    Client.findByIdAndUpdate(req.body._id, req.body, (err, editedItem) => {
        if (err) {
            console.log("Erro a gravar");
            res.redirect("/error");
        } else {
            res.redirect("/admins/clients/show/" + req.body._id);
        }
    });
};

// DELETE 1
//employee
adminController.deleteEmployee = function (req, res) {
    Employee.remove({ _id: req.params.id }).exec((err) => {
        if (err) {
            console.log("Erro a ler");
            res.redirect("/error");
        } else {
            res.redirect("/admins/employees");
        }
    });
};

//book
adminController.deleteBook = function (req, res) {
    Book.remove({ _id: req.params.id }).exec((err) => {
        if (err) {
            console.log("Erro a ler");
            res.redirect("/error");
        } else {
            res.redirect("/admins/books");
        }
    });
};

//client
adminController.deleteClient = async function (req, res) {
    try {
        const result = await Book.find({ client: req.params.id });
 
        if (result.length > 0) {
            //res.redirect("/index/error/409");
            res.status(409).json({ message: "409" });
        } else {
            Client.remove({ _id: req.params.id }).exec((err) => {
                if (err) {
                    console.log("Erro a ler");
                    res.redirect("/error");
                } else {
                    res.redirect("/clients");
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
};

//books
adminController.showAllBooks = function (req, res) {
    Book.find({}).exec((err, dbitems) => {
        if (err) {
            console.log("Erro a ler");
            res.redirect("/error");
        } else {
            console.log(dbitems);
            res.render("admin/books/bookList", { items: dbitems });
        }
    });
};

adminController.showBook = function (req, res) {
    Book.findOne({ _id: req.params.id }).exec((err, dbitem) => {
        if (err) {
            console.log("Erro a ler");
            res.redirect("/error");
        } else {
            res.render("admin/books/bookDetails", { item: dbitem });
        }
    });
};
  
adminController.createFormBook = function (req, res) {
    Book.find({}).exec((err, dbitems) => {
        if (err) {
            console.log("Erro a ler");
            res.redirect("/error");
        } else {
            console.log(dbitems);
            res.render("admin/books/createBook", { items: dbitems });
        }
    });
};
  
adminController.createBook = function (req, res, next) {
    const url = req.protocol + "://" + req.get("host") + "/uploads/" + req.file.filename;

    Book.create(
        {
            name: req.body.name,
            author: req.body.author,
            isbn: req.body.isbn,
            description: req.body.description,
            state: req.body.state,
            stock: req.body.stock,
            cover: url,
        },
        (err) => {
            if (err) {
                console.log(err);
                next(err);
            } else {
                res.redirect("/admins/books");
            }
        }
    );
};
  
adminController.editFormBook = function (req, res) {
    Book.findOne({ _id: req.params.id }).exec((err, dbitem) => {
        if (err) {
            console.log("Erro a ler");
            res.redirect("/error");
        } else {
            res.render("admin/books/bookEdit", { item: dbitem });
        }
    });
};
  
adminController.editBook = function (req, res, next) {
    if (typeof req.file !== "undefined") {
        const url = req.protocol + "://" + req.get("host") + "/uploads/" + req.file.filename;
        
        Book.findByIdAndUpdate(
            req.body._id,
                {
                    name: req.body.name,
                    author: req.body.author,
                    isbn: req.body.isbn,
                    description: req.body.description,
                    state: req.body.state,
                    stock: req.body.stock,
                    cover: url,
                },
                (err) => {
                    if (err) {
                        console.log(err);
                        next(err);
                    } else {
                        res.redirect("/admins/books/show/" + req.body._id);
                    }
                }
        );
    } else {
        Book.findByIdAndUpdate(
            req.body._id,
                {
                    name: req.body.name,
                    author: req.body.author,
                    isbn: req.body.isbn,
                    description: req.body.description,
                    state: req.body.state,
                    stock: req.body.stock,
                    cover: url,
                },
                (err) => {
                    if (err) {
                        console.log(err);
                        next(err);
                    } else {
                        res.redirect("/admins/books/show/" + req.body._id);
                    }
                }
        );
    }
};
  
adminController.deleteBook = function (req, res) {
    Book.remove({ _id: req.params.id }).exec((err) => {
        if (err) {
            console.log("Erro a ler");
            res.redirect("/error");
        } else {
            res.redirect("/admins/books");
        }
    });
};
 
adminController.uploadFile = (req, res, next) => {};
 
module.exports = adminController;