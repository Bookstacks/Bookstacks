const router = require('express').Router()
const { User , Order, LineItem, Book} = require('../db/models')
module.exports = router

// const newCart = {}
// localStorage.setItem('cart', JSON.stringify(newCart))
// const cart = JSON.parse(localStorage.getItem('cart'))
// cart.items = {}

router.get('/:userId/:bookId', (req, res) => {// creates cart order
    User.findById(req.params.userId)//check if user exists
    .then(user => {
        if (user) return user
        else res.sendStatus(404);
    })
    .then(user => {
        if (user.id){
        Order.findOne({ where : {userId: user.id, isCart : true}}) //if user has a cart order
        .then(order => {
            if (!order) return Order.create({userId : user.id}) // create cart order if there is no cart order
            else return order
        })
        .then(order => {
            Book.findById(req.params.bookId)
            .then(book => {
                //Creates lineitem with bookId and orderId
                LineItem.create({bookId : book.id, orderId : order.id, price : book.price, quantity : book.inventoryQuantity}).then(() => res.sendStatus(202))
            })
        })
        }
    })

//     // User.findAll({include:[{model: Order}], where: {id: req.params.userId, isCart: true}})
//     //     .then(user => {
//     //         console.log(user, ',,dlf**********')
//     //         if (user) {

//     //             return user
//     //         }
//     //         else {
                
//     //             res.sendStatus(404)
//     //         }
//     //     })
//     // const { bookId } = req.body
//     // if (!cart.items[bookId]) {
//     //     cart.items[bookId] = 1
//     // }
//     // else {
//     //     cart.items[bookId]++
//     // }
//     // res.send(cart.items)
})