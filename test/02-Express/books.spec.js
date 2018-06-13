/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../../server/db/db')
const app = require('../../server/index')
const Book = db.model('book')

describe('Book routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('GET /api/books', () => {

    beforeEach(() => {
      return Book.create({
        title: 'codysBook',
        author: 'cody',
        genre : ['comedy'],
        description: '..',
        price : 30,
        inventoryQuantity: 1,
      })
    })

    it('renders books in the database', () => {
      return request(app)
        .get('/api/books')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].title).to.be.equal('codysBook')
        })
    })
  }) // end describe('/api/books')
}) // end describe('Book routes')
