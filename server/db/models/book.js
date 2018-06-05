const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Book = db.define('book', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    genre: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        allowNull: false,
        validate: {
            isEmpty: function(value){
                (value) ? true : false
            }
        }
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: 'https://99designs-blog.imgix.net/wp-content/uploads/2017/07/attachment_60213328-e1500059192173.jpg?auto=format&q=60&fit=max&w=930'
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        validate: {
            isNumeric: true,
            min: 0
        }
    },
    inventoryQuantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isNumeric: true,
            min: 0
        }
    },
    summary: {
        type: Sequelize.VIRTUAL,
        get(){
            return this.description.split(' ').slice(0,10).join(' ') + "..."
        }
    }
})

module.exports = Book


