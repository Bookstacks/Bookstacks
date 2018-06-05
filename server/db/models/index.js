const User = require('./user')
const { Order, LineItem } = require('./order')
const Reviews = require('./review')
const Book = require('./book')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

LineItem.belongsTo(Order);
Order.hasMany(LineItem);
User.hasMany(Reviews);
Reviews.belongsTo(User);
User.hasMany(Book, {as: 'ordered_book', constraints: false})
User.belongsTo(Book, {as: 'ordered_books', constraints: false})
Book.hasMany(User, {as: 'ordered_customer', constraints: false})
Book.belongsTo(User, {as: 'ordered_customers', constraints: false})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Order,
  LineItem,
  Reviews,
  Book
}
