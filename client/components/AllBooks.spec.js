/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AllBooks from './AllBooks'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AllBooks', () => {
  let allBooks

  beforeEach(() => {
    allBooks = shallow(<AllBooks />)
  })

  it('renders the Available Books in an h1', () => {
    expect(allBooks.find('h1').text()).to.be.equal('Available Books')
  })
})
