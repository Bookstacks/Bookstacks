const router = require('express').Router()
const { Reviews, User } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
    Reviews.findAll({
        include: [{
            model: User
        }]
    })
      .then(reviews => res.json(reviews))
      .catch(next)
  })

router.get('/user/:userId', (req, res, next) => {
  Reviews.findAll({
      where: {
          userId: req.params.userId
      },
      include: [{
          model: User
      }]
  })
    .then(reviews => res.json(reviews))
    .catch(next)
})

router.get('/book/:bookId', (req, res, next) => {
    Reviews.findAll({
        where: {
            bookId: req.params.bookId
        },
        include: [{
            model: User
        }]
    })
      .then(reviews => res.json(reviews))
      .catch(next)
  })

router.post('/', (req, res, next) => {
  Reviews.create(req.body)
    .then(review => res.status(200).send(review))
    .catch(next)
})
