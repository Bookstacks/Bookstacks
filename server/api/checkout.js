const router = require('express').Router()
const { Order, LineItem } = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
  Order.create({userId : req.body.userId})
  	.then((order) => {
  		//Get Line Items from req.body and create all. 
  		LineItem.create({
  			orderId : order.id,
  			price: 1,// get price data from req.body
  			quantity: 1,// get price data from req.body
  		})
  	})
    .then(order => res.status(200).send(order))
    .catch(next)
})