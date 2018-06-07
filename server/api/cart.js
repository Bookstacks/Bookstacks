const router = require('express').Router()
const { User , Order, LineItem} = require('../db/models')
module.exports = router

// const newCart = {}
// localStorage.setItem('cart', JSON.stringify(newCart))
// const cart = JSON.parse(localStorage.getItem('cart'))
// cart.items = {}

router.post('/:userId/:bookId', (req, res) => {

    User.findById(req.params.userId)
    .then(user => {
        if (user) return user
        else res.sendStatus(404);
    })
    .then(user => {
        Order.findAll({userId: user.id, isCart : true})
        .then(order => {
            console.log(order)
        })
    })

    // User.findAll({include:[{model: Order}], where: {id: req.params.userId, isCart: true}})
    //     .then(user => {
    //         console.log(user, ',,dlf**********')
    //         if (user) {

    //             return user
    //         }
    //         else {
                
    //             res.sendStatus(404)
    //         }
    //     })
    // const { bookId } = req.body
    // if (!cart.items[bookId]) {
    //     cart.items[bookId] = 1
    // }
    // else {
    //     cart.items[bookId]++
    // }
    // res.send(cart.items)
})