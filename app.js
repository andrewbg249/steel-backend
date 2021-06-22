'use strict'

var express = require('express')
var bodyParser = require('body-parser')

var app = express()

// Cargar Rutas
var author_routes = require('./routes/author')
var editorial_routes = require('./routes/editorial')
var book_routes = require('./routes/book')

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Rutas
app.use('/api', author_routes)
app.use('/api', editorial_routes)
app.use('/api', book_routes)

//Exportaciones
module.exports = app