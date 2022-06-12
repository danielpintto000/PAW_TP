//Imports necessários
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var multer  = require('multer');
const cors = require('cors');
const mongoose = require('mongoose');
//var fs = require("fs");
//var swaggerUi = require('swagger-ui-express');
//var swaggerDocument = require('./swagger/swagger.json')
//var urlencodedParser = bodyParser.urlencoded({ extended: false });

//Rotas para acesso
var indexRouter = require("./routes/index");
var employeeRouter = require("./routes/employees");
var bookRouter = require("./routes/books");
var clientRouter = require("./routes/clients");
var adminRouter = require("./routes/admins");
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/users', {useNewUrlParser: true,useUnifiedTopology: true })
  .then(()=> console.log(' connected to DB!')).catch(()=> console.log(' error connecting to DB!'))

var app = express();

var storage = multer.diskStorage({
  /*destination: function(req, file, cb) {
    cb(null, 'tmp/');
  },*/
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

/*app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());*/

// view engine setup
//pasta views
//app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(upload.single('file'));
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//pasta public
//app.use(express.static(path.join(__dirname, "public")));
//pasta uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/auth", authRouter);

app.use("/employees", employeeRouter);
app.use("/books", bookRouter);
app.use("/clients", clientRouter);
app.use("/admins", adminRouter);
app.use("/users", usersRouter);
//app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/", indexRouter);

//app.use('/users', usersRouter);
//app.use('/criar', criarRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;