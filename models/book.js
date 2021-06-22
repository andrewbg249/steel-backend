'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var BookSchema = Schema({
    title: String,
    year: Number,
    genre: String,
    pages: Number,
    idEditorial: String,
    idAuthor: String
})

module.exports = mongoose.model('Book', BookSchema)