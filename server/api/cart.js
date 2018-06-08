const router = require("express").Router();
const { User, Order, LineItem, Book } = require("../db/models");
const Sequelize = require("sequelize");
module.exports = router;


router.get("/:userId", (req, res) => {
  Order.findOne({
    where: {
      userId: req.params.userId,
      isCart: true
    },
    include: [{
        model: LineItem,
        include: [{
            model: Book
        }]

    }]
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
            Book.findById(req.params.bookId).then(book => {
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
});

router.put('/:lineItemId', (req, res, next) => {
    let { lineItemId } = req.params;
    LineItem.update({quantity: Sequelize.literal("quantity + 1")}, {returning: true, where: {id: lineItemId}})
    .then(([rowsUpdate, [updatedLineItem]]) => {
        res.json(updatedLineItem.data);
      })
      .catch(next);
})

