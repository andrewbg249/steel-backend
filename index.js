'use strict'

var mongoose = require('mongoose')
var app = require('./app')
var port = 3000

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/steel')
    .then(() => { console.log('The connection to the database was successful') 

    app.listen(port, () => {
        console.log('Server created successfully')
    })
}).catch((err) => console.log(err))

