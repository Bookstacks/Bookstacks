const router = require('express').Router()
const { Book, Order, LineItem } = require('../db/models')
module.exports = router

router.put('/', (req, res, next) => {
    Order.update({ isCart: false }, { where: { id: req.body.orderId }, returning: true, plain: true })
        .spread((num, order) => {
            res.status(200).send(order)
        })
        .catch(next)
})

router.get('/:id', (req, res, next) => {
    Order.findOne({where: {userId:req.params.id}, include: [{model: LineItem, include: [{model: Book}]}]})
        .then(order => res.json(order))
        .catch(next)
})

