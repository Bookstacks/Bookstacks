const router = require('express').Router()
const { User , Order, LineItem} = require('../db/models')
module.exports = router

// const newCart = {}
// localStorage.setItem('cart', JSON.stringify(newCart))
// const cart = JSON.parse(localStorage.getItem('cart'))
// cart.items = {}

router.post('/:userId/:bookId', (req, res) => {// creates cart order
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
            // hardcoded but change with data in req.body
            // error if book does not exist. 
            LineItem.create({bookId : req.params.bookId, orderId : order.id, price : 1, quantity : 1}).then(() => res.sendStatus(202))
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