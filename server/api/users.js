const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  if (req.user.admin) {
    User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
      .then(users => res.json(users))
      .catch(next)
  }
  else {
    res.sendStatus(403)
  }
})

router.delete('/:userId', (req, res, next) => {
  if (req.user.admin) {
    User.findById(req.params.userId)
      .then(user => user.status(203).destroy())
  }
  else {
    res.sendStatus(403)
  }
})

router.delete('/guest/:userId', (req, res, next) => {
    User.findById(req.params.userId)
      .then(user =>{ 
        if (user) user.destroy()
        else res.sendStatus(403)
      })
})

router.put('/:userId', (req, res, next)=>{
  if (req.user.admin) {
    console.log(req.body)
    User.update(req.body, {returning: true, where:{id: req.params.userId}})
      .then(([numOfRowsUpdated, [updatedUser]])=>{
        res.json(updatedUser);
      })
  }
  else {
    res.sendStatus(403)
  }
})