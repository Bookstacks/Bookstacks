const Sequelize = require('sequelize');
const db = require('../db');

const Reviews = db.define('review', {
   content: {
       type: Sequelize.TEXT,
       allowNull: false,
       validate: {
           len: [10, 255]
       }
   }
 });

 module.exports = Reviews;
