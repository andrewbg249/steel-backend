'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var BookSchema = Schema({
    title: String,
    year: Number,
    genre: String,
    pages: Number,
    editorial: String,
    nameAuthor: String
})

module.exports = mongoose.model('Book', BookSchema)