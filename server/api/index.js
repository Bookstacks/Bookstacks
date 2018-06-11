const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/books', require('./books'))
router.use('/cart', require('./cart'))
router.use('/order', require('./order'))
router.use('/reviews', require('./reviews'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
