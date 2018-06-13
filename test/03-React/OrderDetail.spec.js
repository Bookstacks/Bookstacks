/* global describe beforeEach it */
import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import OrderDetail from '../../client/components/OrderDetail'

const adapter = new Adapter()
enzyme.configure({adapter})


describe('▒▒▒ Frontend tests ▒▒▒', () => {
  describe('Order', () => {
    let testOrder;
    let order = {
	id: 1,
	userId: 1,
	isCart: true,
	lineItems: [{
		id: 1,
		price: 10,
		quantity: 3,
		book: {
			title: 'Infinite Jest'
		}
	},
	{
		id: 2,
		price: 7,
		quantity: 1,
		book: {
			title: '1984'
		}
	}]
    }

    beforeEach(() => {
      testOrder = shallow(<OrderDetail order = {order} />)
    })

    it('renders message in h1', () => {
      expect(testOrder.find('h1').text()).to.be.equal('Order Confirmation')
    })

    it ('renders 3 td tags per lineItems', () => {
      expect(testOrder.find('td').length).to.be.equal(6)
    })
  })
})