'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var AuthorSchema = Schema({
    firstName: String,
    lastName: String,
    dateBirth: String,
    cityBirth: String,
    email: String
})

module.exports = mongoose.model('Author', AuthorSchema)