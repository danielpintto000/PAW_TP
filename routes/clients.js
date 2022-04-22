var express = require('express');
var router = express.Router();
var client = require("../controllers/clientController.js");

// Get all clients
router.get('/', function(req, res) {
    client.list(req, res);
});

// Get single client by id
router.get('/show/:id', function(req, res) {
    client.show(req, res);
});

// Create client
router.get('/create', function(req, res) {
    client.create(req, res);
});

// Save client
router.post('/save', function(req, res) {
    client.save(req, res);
});

// Edit client
router.get('/edit/:id', function(req, res) {
    client.edit(req, res);
});

// Edit update
router.post('/update/:id', function(req, res) {
    client.update(req, res);
});

// Delete update
router.post('/delete/:id', function(req, res, next) {
    client.delete(req, res);
});

module.exports = router;