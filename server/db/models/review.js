const Sequelize = require('sequelize');
const db = require('../db');

const Reviews = db.define('review', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [5, 50]
        }
    },
    rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isNumeric: true,
            min: 1,
            max: 5
        }
    },
   content: {
       type: Sequelize.TEXT,
       allowNull: false,
       validate: {
           len: [10, 255]
       }
   }
 });

 module.exports = Reviews;
