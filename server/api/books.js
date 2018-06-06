const router = require('express').Router()
const { Book } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Book.findAll()
    .then(books => res.json(books))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Book.findById(req.params.id)
    .then(book => res.status(200).send(book))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Book.create(req.body)
    .then(book => res.status(200).send(book))
    .catch(next)
})