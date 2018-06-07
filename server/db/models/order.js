const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
   userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    isCart: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
});

const LineItem = db.define('lineItem', {
    price: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
});


module.exports = {
    Order,
    LineItem
};
 