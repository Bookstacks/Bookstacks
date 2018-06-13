/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../../server/db/index')
const Reviews = db.model('review')

describe('review model', () => {
  
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('content must be at least 10 characters', ()=>{

    let contentSu, contentFail

    Reviews.create({
      title : 'test',
      content: 'I am at least 10 characters.',
      rating : 3,
    })
      .then(review => {
        contentSu = review.content
      })

    it('creats reviews with at least 10 characters', () => {
      expect(contentSu).to.equal('I am at least 10 characters.')
  })

  describe('validations', () => {
    // *Assertion translation*:
    // The `title` column should be a required field.
    it('require title', () => {
        const testReview = Reviews.build();
        return testReview.validate()
          .then(() => { throw new Error('Promise should have rejected');})
          .catch(err => {
              expect(err).to.exist;
              expect(err).to.be.an('error');

          });
      });
    })
  })
})// end describe('Review model')
