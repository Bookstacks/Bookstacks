const router = require('express').Router()
const {Book} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Book.findAll()
    .then(books => res.json(books))
    .catch(next)
})
