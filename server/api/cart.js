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

router.post("/:userId/:bookId", async (req, res) => {
  // creates cart order
  const user = await User.findById(req.params.userId) //check if user exists
  const order = await Order.findOne({where : {userId : user.id, isCart: true}})
  const cart = order ? order : await Order.create({ userId: user.id })
  const book = await Book.findById(req.params.bookId)
  const lineItem = await LineItem.findOne({where: { orderId: cart.id, bookId: book.id}})
  if (lineItem) await lineItem.increment(['quantity'], {by : 1})
  else await LineItem.create({
                      bookId: book.id,
                      orderId: cart.id,
                      price: book.price,
                      quantity: 1
                    })
  await book.decrement(['inventoryQuantity'], {by : 1})
  res.status(202).send(cart);
});

router.put('/:lineItemId', async (req, res, next) => {
    const { lineItemId } = req.params;
    const increment = req.body.increment;
    const lineItem = await LineItem.findById(lineItemId)
    await lineItem.increment(['quantity'], {by : increment});
    const book = await Book.findById(lineItem.bookId)
    await book.decrement(['inventoryQuantity'], {by : increment})
    res.status(202).json(lineItem.dataValues);
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
        Book.findById(itemInfo.bookId)
        .then(book => book.increment(
          ['inventoryQuantity'], 
          {by : itemInfo.quantity}))
    })
    .then(() => res.sendStatus(203))
    .catch(next);
})
