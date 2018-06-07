const router = require('express').Router()
const {  } = require('../db/models')
module.exports = router

const newCart = {}
localStorage.setItem('cart', JSON.stringify(newCart))
const cart = JSON.parse(localStorage.getItem('cart'))
cart.items = {}

router.post('/cart/:bookId', (req, res) => {
    const { bookId } = req.body
    if (!cart.items[bookId]) {
        cart.items[bookId] = 1
    }
    else {
        cart.items[bookId]++
    }
    res.send(cart.items)
})