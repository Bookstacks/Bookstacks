const router = require('express').Router()
const {User, Order} = require('../db/models/')
module.exports = router

router.post('/login', (req, res, next) => {

  User.findOne({where: {email: req.body.email}})
    .then(user => {
      if (!user) {
        console.log('No such user found:', req.body.email)
        res.status(401).send('Wrong username and/or password')
      } else if (!user.correctPassword(req.body.password)) {
        console.log('Incorrect password for user:', req.body.email)
        res.status(401).send('Wrong username and/or password')
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)))
        //update guest order to user order
        Order.findOne({where: {userId : req.body.guestUserId, isCart : true}})
        .then(order => {
          if (order) order.update({userId : user.id})
        })
      }
    })
    .catch(next)
})

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => (err ? next(err) : res.json(user)))
      Order.findOne({where: {userId : req.body.guestUserId, isCart : true}})
        .then(order => {
          if (order) order.update({userId : user.id})
        })
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err)
      }
    })
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.post('/guest', (req, res) => {
  User.create({sessionId : req.session.id}).then(user => res.status(202).json(user))
})

router.use('/google', require('./google'))
