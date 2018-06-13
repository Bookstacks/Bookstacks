const router = require("express").Router();
const { User, Order, LineItem, Book } = require("../db/models");
const Sequelize = require("sequelize");
module.exports = router;


router.get("/:userId", (req, res) => {

    Order.findOne({
      where: {
        userId: +req.params.userId,
        isCart: true
      },
      include: [{
          model: LineItem,
          include: [{
              model: Book
          }]
      }],
      order : [['lineItems', 'id', 'ASC']],
    })
    .then( order => res.send(order));
});

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
            Book.findById(req.params.bookId)
            .then(book => {
              //Creates lineitem with bookId and orderId
              if (book) {
                LineItem.findOne({
                  where: { orderId: order.id, bookId: book.id }
                })
                .then(lineItem => {
                  if (!lineItem) {
                    LineItem.create({
                      bookId: book.id,
                      orderId: order.id,
                      price: book.price,
                      quantity: 1
                    })
                  } else {
                    lineItem.increment(['quantity'], {by : 1})
                  }
                })
                .then(cart => {
                  book.decrement(['inventoryQuantity'], {by : 1})
                  return cart
                })
                .then(cart => res.status(202).send(cart));
              } else res.sendStatus(404);
            });
          });
      } else res.sendStatus(404);
    });
});

router.put('/:lineItemId', (req, res, next) => {
    let { lineItemId } = req.params;
    let increment = req.body.increment;
    LineItem.findById(lineItemId)
    .then(lineItem => {
      return lineItem.increment(['quantity'], {by : increment})
      .then(item => {
        Book.findById(lineItem.bookId).then(book => book.decrement(['inventoryQuantity'], {by : increment}))
        return item;
      })
    })
    .then(lineItem => {
      res.status(202).json(lineItem.dataValues)})
    .catch(next);
})

router.delete('/:lineItemId', (req, res, next) => {
    let { lineItemId } = req.params;
    LineItem.findById(lineItemId)
    .then(lineItem => {
      let itemInfo = {bookId : lineItem.bookId, quantity : lineItem.quantity};
      lineItem.destroy()
      return itemInfo;
    })
    .then(itemInfo => {
        Book.findById(itemInfo.bookId).then(book => book.increment(['inventoryQuantity'], {by : itemInfo.quantity}))
    })
    .then(() => res.sendStatus(203))
    .catch(next);
})
