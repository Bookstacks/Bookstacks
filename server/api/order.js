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

router.get("/:userId", (req, res) => {
    if (req.user.id === +req.params.userId || req.user.admin) {
        Order.findAll({
            where: {
                userId: +req.params.userId,
                isCart: false
            },
            include: [{
                model: LineItem,
                include: [{
                    model: Book
                }]
            }],
            order: [['lineItems', 'id', 'ASC']],
        })
            .then(order => res.send(order));
    }
    else {
        res.sendStatus(403)
    }
});

router.get("/", (req, res) => {
    if (req.user.admin) {
        Order.findAll({
            include: [{
                model: LineItem,
                include: [{
                    model: Book
                }]
            }],
            order: [['lineItems', 'id', 'ASC']],
        })
            .then(order => res.send(order));
    }
    else {
        res.sendStatus(403)
    }
});