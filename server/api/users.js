const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.delete('/:userId', (req, res, next) => {
	console.log(req.params.userId)
	User.findById(req.params.userId)
	.then(user => user.status(203).destroy())
}) 