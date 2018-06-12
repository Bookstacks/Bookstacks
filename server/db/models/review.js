const Sequelize = require('sequelize');
const db = require('../db');

const Reviews = db.define('review', {
    userName: {
        type: Sequelize.STRING,
        defaultValue: "Anonymous",
        validate: {
            len: [2, 12]
        }
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2, 50]
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
           len: [3, 255]
       }
   }
 });

 module.exports = Reviews;
