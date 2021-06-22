'use strict'

var express = require('express')
var AuthorController = require('../controllers/author')

var api = express.Router()

api.get('/test-author', AuthorController.test)
api.post('/save-author', AuthorController.saveAuthor)
api.get('/get-author/:id', AuthorController.getAuthor)
api.get('/get-authors/:page?', AuthorController.getAuthors)

module.exports = api