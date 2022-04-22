var express = require('express');
var router = express.Router();
var book = require("../controllers/bookController.js");

// Get all books
router.get('/', function(req, res) {
    book.list(req, res);
});

// Get single book by id
router.get('/show/:id', function(req, res) {
    book.show(req, res);
});

// Create book
router.get('/create', function(req, res) {
    book.create(req, res);
});

// Save book
router.post('/save', function(req, res) {
    book.save(req, res);
});

// Edit book
router.get('/edit/:id', function(req, res) {
    book.edit(req, res);
});

// Edit update
router.post('/update/:id', function(req, res) {
    book.update(req, res);
});

// Delete update
router.post('/delete/:id', function(req, res, next) {
    book.delete(req, res);
});

module.exports = router;