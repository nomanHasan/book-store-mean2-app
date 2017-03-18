var express = require("express");

var router = express.Router();

var books = require("./api/books");
var authors = require("./api/authors");

router.use('/books', books);
router.use('/authors', authors);


module.exports = router;