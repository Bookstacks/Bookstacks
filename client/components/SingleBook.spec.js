/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {SingleBook} from './SingleBook'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('SingleBook', () => {
  let singleBook;
  const testBook =   {
      title: "One Hundred Years of Solitude",
      author: "Gabriel Garcia Marquez",
      genre: ["Novel", "Magical Realism"],
      price: 13,
      imageUrl: "/books/hundred_years.jpg",
      description: "One of the twentieth century’s most beloved and acclaimed novels, One Hundred Years of Solitude tells the story of the rise and fall, birth and death of the mythical town of Macondo through the history of the Buendia family. Inventive, amusing, magnetic, sad, and alive with unforgettable men and women—brimming with truth, compassion, and a lyrical magic that strikes the soul—this novel is a masterpiece in the art of fiction.",
      inventoryQuantity: 10
  };
  const testUser = {
  	email : 'abc@abc.com',
  	googleId : 'abcdef'	
  };
  const testReviews = [{
  	title : 'abccdef',
  	rating : 4,
  	content : 'abcdeabcdefg',
  }];

  beforeEach(() => {
    singleBook = shallow(<SingleBook book = {testBook} user = {testUser} reviews = {testReviews}/>)
  })

  it('renders book title', () => {
  	expect((singleBook.find('CardTitle').text()).to.be.equal(`by ${book.title}`))
  })
})
