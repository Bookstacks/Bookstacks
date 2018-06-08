const router = require("express").Router();
const { User, Order, LineItem, Book } = require("../db/models");
const Sequelize = require('sequelize');
module.exports = router;

// const newCart = {}
// localStorage.setItem('cart', JSON.stringify(newCart))
// const cart = JSON.parse(localStorage.getItem('cart'))
// cart.items = {}

router.post("/:userId/:bookId", (req, res) => {
  // creates cart order
  User.findById(req.params.userId) //check if user exists
    .then(user => {
      if (user) {
        Order.findOne({ where: { userId: user.id, isCart: true } }) //if user has a cart order
          .then(order => {
            if (!order) return Order.create({ userId: user.id });
            // create cart order if there is no cart order
            else return order;
          })
          .then(order => {
            Book.findById(req.params.bookId).then(book => {
              //Creates lineitem with bookId and orderId
              if(book){
                LineItem.findOne({ where: { orderId: order.id, bookId: book.id } })
                .then(lineItem => {
                  if (!lineItem) {
                    LineItem.create({
                      bookId: book.id,
                      orderId: order.id,
                      price: book.price,
                      quantity: 1
                    });
                  } else {
                    lineItem.update({
                      quantity: Sequelize.literal("quantity + 1")
                    });
                  }
                })
                .then(() => res.sendStatus(202));
              } else res.sendStatus(404);
            });
          });
      } else res.sendStatus(404);
    });

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
});
