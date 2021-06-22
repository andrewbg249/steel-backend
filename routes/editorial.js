'use strict'

var express = require('express')
var EditorialController = require('../controllers/editorial')

var api = express.Router()

api.get('/test-editorial', EditorialController.test)
api.post('/save-editorial', EditorialController.saveEditorial)
api.get('/get-editorial/:id', EditorialController.getEditorial )
api.get('/get-editorials/:page?', EditorialController.getEditorials)

module.exports = api