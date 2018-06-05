const { expect } = require('chai')
const db = require('../index')
const Book = db.model('book')

describe('▒▒▒ Backend tests ▒▒▒', () => {
  beforeEach('Synchronize and clear database', () => db.sync({ force : true }));

  after('Synchronize and clear database', () => db.sync({ force : true }));

  describe('Sequelize models', function () {

    describe('Book Model', () => {
      // *Assertion translation*:
      // This assertion expects that the User model will
      // put an `email` column in the users table.

      describe('validations', () => {

        // *Assertion translation*:
        // The `title`, 'author', 'genre', 'description', 'price', 'inventoryQuantity' column should be a required field.
        it('require data', async () => {
          const book = Book.build();
          return book.validate()
            .then(() => { throw new Error('Promise should have rejected'); })
            .catch(err => {
              expect(err).to.exist;
              expect(err).to.be.an('error');
            });
        });
      });

    });
  })
})