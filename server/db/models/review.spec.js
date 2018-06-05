/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Reviews = db.model('review')

describe('review model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('content field', ()=>{
    describe('content must be at least 10 characters', ()=>{

      let contentSu, contentFail

      Reviews.create({
        content: 'I am at least 10 characters.'
      })
        .then(review => {
          contentSu = review.content
        })


      it('creats reviews with at least 10 characters', () => {
        expect(contentSu).to.equal('I am at least 10 characters.')
    })

      Reviews.create({
        content: 'I am'
      })
        .then(review => {
          contentFail = review.content
        })
        .catch(err => console.error(err))

      it('fails creats reviews with less than 10 characters', () => {
        expect(contentFail).to.equal(undefined)
      })

  })
})
})// end describe('Review model')
