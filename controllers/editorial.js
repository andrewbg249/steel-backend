'use strict'

var Editorial = require('../models/editorial')

const { exists } = require('../models/editorial')

// Función que permite validar si se carga correctamente el Editorial controller
function test(req, res) {
    res.status(200).send({ message: 'This is the test for the Editorial Controller' })
}

// Función que permite agregar una editorial
function saveEditorial(req, res) {
    var params = req.body
    var editorial = new Editorial()

    if (params.name && params.address && params.phone && params.email) {
        editorial.name = params.name
        editorial.address = params.address
        editorial.phone = params.phone
        editorial.email = params.email

        if(params.maxBooks){
            editorial.maxBooks = params.maxBooks
        }else{
            editorial.maxBooks = -1
        }
        

        Editorial.find({
            $or: [
                { email: editorial.email.toLowerCase() },
                { name: editorial.name.toLowerCase() }
            ]
        }).exec((err, editorials) => {
            if (err) return res.status(500).send({ message: 'Request Error' })

            if (editorials && editorials.length > 0){
                return res.status(200).send({ message: 'Editorial already exists' })
            }

            editorial.save((err, editorialStored) => {
                if (err) return res.status(500).send({ message: 'Error saving the Editorial'})

                if (editorialStored){
                    res.status(200).send({ editorial })
                }else{
                    res.status(404).send({ message: 'Editorial has not been registered' })
                }
            })
        })
    }else{
        res.status(200).send({ message: 'Missing Data' })
    }
}

// Función que permite obtener una editorial registrada
function getEditorial(req, res){
    var editorialId = req.params.id

    Editorial.findById(editorialId, (err, editorial) => {
        if (err) return res.status(500).send({ message: 'Request Error' })

        if (!editorial) return res.status(500).send({ message: 'Editorial does not exist' })

        return res.status(200).send({ editorial })
    })
}

// Función que obtiene todas las editoriales registradas, de forma paginada
function getEditorials(req, res){
    var page = 1
    if(req.params.page){
        page = req.params.page
    }

    var itemsPerPage = 10

    Editorial.find().sort('_id').paginate(page, itemsPerPage, (err, editorials, total) => {
        if (err) return res.status(500).send({ message: 'Request Error' })

        if (!editorials) return res.status(404).send({ message: 'No registered Editorials' })

        return res.status(200).send({ 
            editorials,
            total,
            pages: Math.ceil(total/itemsPerPage)
        })
    })
}

module.exports = {
    test,
    saveEditorial,
    getEditorial,
    getEditorials
}