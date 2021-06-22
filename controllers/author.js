'use strict'

var Author = require('../models/author')
var mongoosePaginate = require('mongoose-pagination')

const { exists } = require('../models/author')

// Función que permite validar si se carga correctamente el Author controller
function test(req, res){
    res.status(200).send({ message: 'This is the test for the Author Controller' })
}

// Función que permite agregar un autor
function saveAuthor(req, res){
    var params = req.body
    var author = new Author()

    if(params.firstName && params.lastName && params.dateBirth && params.cityBirth && params.email){
        author.firstName = params.firstName
        author.lastName = params.lastName
        author.dateBirth = params.dateBirth
        author.cityBirth = params.cityBirth
        author.email = params.email

        Author.find({ email: author.email.toLowerCase() }).exec((err, authors) => {
            if(err) return res.status(500).send({ message: 'Request Error'})

            if(authors && authors.length > 0) {
                return res.status(200).send({ message: 'Author already exists'})
            }

            author.save((err, authorStored) => {
                if (err) return res.status(500).send({ message: 'Error saving the Author' })

                if (authorStored){
                    res.status(200).send({ author })
                }else{
                    res.status(404).send({ message: 'Author has not been registered' })
                }
            })
        })
    }else{
        res.status(200).send({ message: 'Missing Data' })
    }
}

// Función que permite obtener un autor registrado
function getAuthor(req, res){
    var authorId = req.params.id

    Author.findById(authorId, (err, author) => {
        if (err) return res.status(500).send({ message: 'Request Error' })

        if (!author) return res.status(500).send({ message: 'Author does not exist' })

        return res.status(200).send({ author })
    })
}

// Función que obtiene todos los autores registrados, de forma paginada
function getAuthors(req, res){
    var page = 1
    if(req.params.page){
        page = req.params.page
    }

    var itemsPerPage = 10

    Author.find().sort('_id').paginate(page, itemsPerPage, (err, authors, total) => {
        if (err) return res.status(500).send({ message: 'Request Error' })

        if (!authors) return res.status(404).send({ message: 'No registered Authors' })

        return res.status(200).send({ 
            authors,
            total,
            pages: Math.ceil(total/itemsPerPage)
        })
    })
}

module.exports = {
    test,
    saveAuthor,
    getAuthor,
    getAuthors
}