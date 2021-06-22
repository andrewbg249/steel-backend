'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var EditorialSchema = Schema({
    name: String,
    address: String,
    phone: String,
    email: String,
    maxBooks: Number
})

module.exports = mongoose.model('Editorial', EditorialSchema)