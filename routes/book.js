'use strict'

var express = require('express')
var BookController = require('../controllers/book')

var api = express.Router()

api.get('/test-book', BookController.test)
api.post('/save-book', BookController.saveBook)
api.get('/get-book/:id', BookController.getBook)
api.get('/get-books/:page?', BookController.getBooks)

module.exports = api