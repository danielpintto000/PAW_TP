/*Imports necessários para o controller do admin (administrador). Pode criar/editar/remover 
    livros/funcionários/clientes*/
var mongoose = require("mongoose");
var Employee = require("../models/employee");
var Book = require("../models/book");
var Client = require("../models/client");

var adminController = {};

//Criar a página principal (main page) do admin (administrador)
adminController.mainPage = function (req, res) {
    console.log("controller1");
    res.render("admin/admin");
};
 
/*
book.remove({}, function(err) { 
    console.log('collection removed') 
});*/
 
//SHOW ALL
//Apresenta uma lista com informações de todos os funcionários (employees)
adminController.showAllEmployees = function (req, res) {
    Employee.find({}).exec((err, dbitems) => {
        //Se ocorrer um erro
        if (err) {
            //Apresentar mensagem de erro na consola
            console.log("Erro a ler");

            //Apresentar página com o erro
            res.redirect("/error");
        } else {
            console.log(dbitems);

            //Apresentar a página com a lista
            res.render("admin/employees/employeeList", { items: dbitems });
        }
   });
};

//Apresenta uma lista com todos os livros (books)
adminController.showAllBooks = function (req, res) {
    Book.find({}).exec((err, dbitems) => {
        //Se ocorrer um erro
        if (err) {
            //Apresentar mensagem de erro na consola
            console.log("Erro a ler");

            //Apresentar página com o erro
            res.redirect("/error");
        } else {
            console.log(dbitems);

            //Apresentar a página com a lista
            res.render("admin/books/bookList", { items: dbitems });
        }
    });
};

//Apresenta uma lista com todos os clientes (clients)
adminController.showAllClients = function (req, res) {
    Client.find({}).exec((err, dbitems) => {
        //Se ocorrer um erro
        if (err) {
            //Apresentar mensagem de erro na consola
            console.log("Erro a ler");

            //Apresentar página com o erro
            res.redirect("/error");
        } else {
            console.log(dbitems);

            //Apresentar a página com a lista
            res.render("admin/clients/clientList", { items: dbitems });
        }
    });
};

//SHOW ONE
//Apresenta detalhes de um funcionário (employee)
adminController.showEmployee = function (req, res) {
    Employee.findOne({ _id: req.params.id }).exec((err, dbitem) => {
        //Se ocorrer um erro
        if (err) {
            //Apresentar mensagem de erro na consola
            console.log("Erro a ler");

            //Apresentar página com o erro
            res.redirect("/error");
        } else {
            //Apresentar a página com os detalhes
            res.render("admin/employees/employeeDetails", { item: dbitem });
        }
    });
};

//Apresenta detalhes de um livro (book)
adminController.showBook = function (req, res) {
    Book.findOne({ _id: req.params.id }).exec((err, dbitem) => {
        //Se ocorrer um erro
        if (err) {
            //Apresentar mensagem de erro
            console.log("Erro a ler");

            //Apresentar página com o erro
            res.redirect("/error");
        } else {
            //Apresentar a página com os detalhes
            res.render("admin/books/bookDetails", { item: dbitem });
        }
    });
};

//Apresenta detalhes de um cliente (client)
adminController.showClient = function (req, res) {
    Client.findOne({ _id: req.params.id }).exec((err, dbitem) => {
        //Se ocorrer um erro
        if (err) {
            //Apresentar mensagem de erro
            console.log("Erro a ler");

            //Apresentar página com o erro
            res.redirect("/error");
        } else {
            //Apresentar a página com os detalhes
            res.render("admin/clients/clientDetails", { item: dbitem });
        }
    });
};

// CREATE 1 (FORM GET)
//Apresenta um formulário para criar um funcionário (employee)
adminController.createFormEmployee = function (req, res) {
    console.log("controller1");
    res.render("admin/employees/createEmployee");
};

//Apresenta um formulário para criar um livro (book)
adminController.createFormBook = function (req, res) {
    Book.find({}).exec((err, dbitems) => {
        //Se ocorrer um erro
        if (err) {
            //Apresentar mensagem de erro na consola
            console.log("Erro a ler");

            //Apresentar página com o erro
            res.redirect("/error");
        } else {
            console.log(dbitems);

            //Apresentar a página com o formulário
            res.render("admin/books/createBook", { items: dbitems });
        }
    });
};

//Apresentar um formulário para criar um cliente (client)
adminController.createFormClient = function (req, res) {
    console.log("controller1");
    res.render("admin/clients/createClient");
};

// CREATE employee (POST)
//employee
adminController.createEmployee = function (req, res) {
    var employee = new Employee(req.body);

    employee.save((err) => {
        //Se ocorrer um erro
        if (err) {
            //Apresentar mensagem de erro na consola
            console.log("Erro a gravar");

            //Apresetar página com o erro
            res.redirect("/error");
        } else {
            res.redirect("/admins/employees");
        }
    });
};

//Criar um novo livro (book)
adminController.createBook = function (req, res, next) {
    //Obter path do uploads
    const url = req.protocol + "://" + req.get("host") + "/uploads/" + req.file.filename;

    //Cria um livro (book) com a informação presente no body do request
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
                //Apresentar mensagem de erro na consola
                console.log(err);
                next(err);
            } else {
                res.redirect("/admins/books");
            }
        }
   );
};
 
//Criar um cliente
adminController.createClient = function (req, res) {
    var client = new Client(req.body);
    
    client.save((err) => {
        if (err) {
            //Apresentar mensagem de erro na consola
            console.log("Erro a gravar");
            res.redirect("/error");
        } else {
            res.redirect("/admins/clients");
        }
    });
};

//EDITAR 1 (FORM GET)
//Apresenta um formulário para editar dados relativos a um funcionário (employee)
adminController.editFormEmployee = function (req, res) {
    Employee.findOne({ _id: req.params.id }).exec((err, dbitem) => {
        //Se ocorrer um erro
        if (err) {
            //Apresentar mensagem de erro na consola
            console.log("Erro a ler");

            //Apresentar página com o erro
            res.redirect("/error");
        } else {
            //Apresentar página com o formulário
            res.render("admin/employees/employeeEdit", { item: dbitem });
        }
    });
};

//Apresenta um formulário para editar dados relativos a um livro (book)
adminController.editFormBook = function (req, res) {
    Book.findOne({ _id: req.params.id }).exec((err, dbitem) => {
        //Se ocorrer um erro
        if (err) {
            //Apresentar mensagem de erro na consola
            console.log("Erro a ler");

            //Apresentar página com o erro
            res.redirect("/error");
        } else {
            //Apresentar página com o formulário
            res.render("admin/books/bookEdit", { item: dbitem });
        }
    });
};

//Apresenta um formulário para editar dados relativos a um cliente (client)
adminController.editFormClient = function (req, res) {
    Client.findOne({ _id: req.params.id }).exec((err, dbitem) => {
        //Se ocorrer um erro
        if (err) {
            //Apresentar mensagem de erro na consola
            console.log("Erro a ler");

            //Apresentar página com o erro
            res.redirect("/error");
        } else {
            //Apresentar página com o formulário
            res.render("admin/clients/clientEdit", { item: dbitem });
        }
    });
};

// EDITAR 1 (POST)
//Editar informação de um funcionário (employee)
adminController.editEmployee = function (req, res) {
    Employee.findByIdAndUpdate(req.body._id, req.body, (err, editedItem) => {
        if (err) {
            //Apresentar mensagem de erro na consola
            console.log("Erro a gravar");
            res.redirect("/error");
        } else {
            res.redirect("/admins/employees/show/" + req.body._id);
        }
    });
};

//Editar informação de um livro (book)
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

//Editar informação de um cliente (client)
adminController.editClient = function (req, res) {
    Client.findByIdAndUpdate(req.body._id, req.body, (err, editedItem) => {
        if (err) {
            //Apresentar mensagem de erro na consola
            console.log("Erro a gravar");
            res.redirect("/error");
        } else {
            res.redirect("/admins/clients/show/" + req.body._id);
        }
    });
};

// DELETE 1
//Apagar dados relativos a um funcionário (employee)
adminController.deleteEmployee = function (req, res) {
    Employee.remove({ _id: req.params.id }).exec((err) => {
        //Se ocorrer um erro
        if (err) {
            //Apresentar mensagem de erro na consola
            console.log("Erro a ler");

            //Apresentar página com o erro
            res.redirect("/error");
        } else {
            res.redirect("/admins/employees");
        }
    });
};

//Apagar dados relativos a um livro (book)
adminController.deleteBook = function (req, res) {
    Book.remove({ _id: req.params.id }).exec((err) => {
        //Se ocorrer um erro
        if (err) {
            //Apresentar mensafem de erro na consola
            console.log("Erro a ler");

            //Apresentar página com o erro
            res.redirect("/error");
        } else {
            res.redirect("/admins/books");
        }
    });
};

//Apagar dados relativos a um cliente (client)
adminController.deleteClient = async function (req, res) {
    try {
        const result = await Book.find({ client: req.params.id });
 
        if (result.length > 0) {
            //res.redirect("/index/error/409");
            res.status(409).json({ message: "409" });
        } else {
            Client.remove({ _id: req.params.id }).exec((err) => {
                //Se ocorrer um erro
                if (err) {
                    //Apresentar mensagem de erro na consola
                    console.log("Erro a ler");

                    //Apresentar página com o erro
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
 
adminController.uploadFile = (req, res, next) => {};
 
module.exports = adminController;