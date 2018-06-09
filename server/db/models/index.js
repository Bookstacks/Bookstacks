const User = require('./user')
const { Order, LineItem } = require('./order')
const Reviews = require('./review')
const Book = require('./book')
const Genre = require ('./genre')

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

Book.hasMany(Reviews);
Reviews.belongsTo(Book);

Book.hasMany(LineItem);
LineItem.belongsTo(Book);

Order.hasMany(User);
User.belongsTo(Order)

Book.belongsToMany(Genre, {through: 'category'})
Genre.belongsToMany(Book, {through: 'category'})




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
  Book,
  Genre
}
