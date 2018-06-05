/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')
const LineItem = db.model('lineItem')

describe('LineItem model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('lineItem fields test', ()=>{
    describe('quantity defaults to 1', ()=> {

      let quantityTest, orderTestProductId

      LineItem.create({
        price: 12.00,
        productId: 3
      })
      .then(item => {
        quantityTest = item.quantity
      })

      Order.create({
        userId: 1
      })
        .then(order => {
          Order.findAll({
            include:[{
              model: LineItem
            }]
          })
            .then(orderWithLineItem => {
              console.log(orderWithLineItem.length);
              orderTestProductId = orderWithLineItem.length
            })
        })


      it('creats item in order with default quantity', () => {
        expect(quantityTest).to.equal(1)
      })

      it('it eagerloads lineItems', () => {
        expect(orderTestProductId).to.equal(1)
      })


    })

  })
})// end describe('lineItem model')
