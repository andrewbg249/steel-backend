'use strict'

var Book = require('../models/book')
var Editorial = require('../models/editorial')
var Author = require('../models/author')

const { exists } = require('../models/book')

// Función que permite validar si se carga correctamente el Book controller
function test(req, res) {
    res.status(200).send({ message: 'This is the test for the Book Controller' })
}

// Función que permite agregar un libro
function saveBook(req, res) {
    var params = req.body
    var book = new Book()
    var authorRes = new Author()
    var editorialRes = new Editorial()

    if (params.title && params.year && params.genre && params.pages && params.idEditorial && params.idAuthor) {
        book.title = params.title
        book.year = params.year
        book.genre = params.genre
        book.pages = params.pages
        book.idEditorial = params.idEditorial
        book.idAuthor = params.idAuthor

        Editorial.findById(params.idEditorial, (err, editorial) => {
            if (!editorial) return res.status(500).send({ message: 'Editorial is not registered' })
          
            if (editorial.maxBooks == -1){
                return res.status(500).send({ message: 'Editorial has exceeded the registration limits' })
            }else{

                Author.findById(params.idAuthor, (err, author) => {
                    if (!author) return res.status(500).send({ message: 'Author is not registered' })
                  
                    Book.find({ title: book.title.toLowerCase() }).exec((err, books) => {
                        if (err) return res.status(500).send({ message: 'Request Error' })
            
                        if (books && books.length > 0) {
                            return res.status(200).send({ message: 'Book already exists' })
                        }
            
                        console.log( Book.find({ title: book.title.toLowerCase()}))

                        book.save((err, bookStored) => {
                            if (err) return res.status(500).send({ message: 'Error saving the Book' })
            
                            if (bookStored) {
                                res.status(200).send({ book })
                            } else {
                                res.status(404).send({ message: 'Book has not been registered' })
                            }
                        })
                    })
                    
                })      

            }
        })
        
        

    } else {
        res.status(200).send({ message: 'Missing Data' })
    }
}

// Función que permite obtener un libro registrado
function getBook(req, res) {
    var bookId = req.params.id

    Book.findById(bookId, (err, book) => {
        if (err) return res.status(500).send({ message: 'Request Error' })

        if (!book) return res.status(500).send({ message: 'Book does not exist' })

        return res.status(200).send({ book })
    })
}

// Función que obtiene todos los libros registrados, de forma paginada
function getBooks(req, res) {
    var page = 1
    if (req.params.page) {
        page = req.params.page
    }

    var itemsPerPage = 10

    Book.find().sort('_id').paginate(page, itemsPerPage, (err, books, total) => {
        if (err) return res.status(500).send({ message: 'Request Error' })

        if (!books) return res.status(404).send({ message: 'No registered Books' })

        return res.status(200).send({
            books,
            total,
            pages: Math.ceil(total / itemsPerPage)
        })
    })
}
module.exports = {
    test,
    saveBook,
    getBook,
    getBooks
}