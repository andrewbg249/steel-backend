'use strict'

var Book = require('../models/book')
var Editorial = require('../models/editorial')

const { exists } = require('../models/book')

// Función que permite validar si se carga correctamente el Book controller
function test(req, res){
    res.status(200).send({ message: 'This is the test for the Book Controller' })
}

// Función que permite agregar un libro
function saveBook(req, res){
    var params = req.body
    var book = new Book()

    if(params.title && params.year && params.genre && params.pages && params.editorial && params.nameAuthor){
        book.title = params.title
        book.year = params.year
        book.genre = params.genre
        book.pages = params.pages
        book.editorial = params.editorial
        book.nameAuthor = params.nameAuthor

        Editorial.find({ name: book.editorial.toLowerCase() }).exec((err, editorials) => {
            if (err) return res.status(500).send({ message: 'Request Error' })

            if( editorials && editorials.maxBooks < 0){
                return res.status(200).send({ message: 'Its not possible to register the book, the maximum allowed was reached' })
            }
            console.log(editorials)
        })


        Book.find({ title: book.title.toLowerCase() }).exec((err, books) => {
            if (err) return res.status(500).send({ message: 'Request Error' })

            if( books && books.length > 0){
                return res.status(200).send({ message: 'Book already exists' })
            }

            book.save((err, bookStored) => {
                if (err) return res.status(500).send({ message: 'Error saving the Book' })

                if (bookStored){
                    res.status(200).send({ book })
                }else{
                    res.status(404).send({ message: 'Book has not been registered' })
                }
            })
        })
    }else{
        res.status(200).send({ message: 'Missing Data' })
    }
}

// Función que permite obtener un libro registrado
function getBook(req, res){
    var bookId = req.params.id

    Book.findById(bookId, (err, book) => {
        if (err) return res.status(500).send({ message: 'Request Error' })

        if (!book) return res.status(500).send({ message: 'Book does not exist' })

        return res.status(200).send({ book })
    })
}

// Función que obtiene todos los libros registrados, de forma paginada
function getBooks(req, res){
    var page = 1
    if(req.params.page){
        page = req.params.page
    }

    var itemsPerPage = 10

    Book.find().sort('_id').paginate(page, itemsPerPage, (err, books, total) => {
        if (err) return res.status(500).send({ message: 'Request Error' })

        if (!books) return res.status(404).send({ message: 'No registered Books' })

        return res.status(200).send({ 
            books,
            total,
            pages: Math.ceil(total/itemsPerPage)
        })
    })
}
module.exports = {
    test,
    saveBook,
    getBook,
    getBooks
}