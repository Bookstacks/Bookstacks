/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {fetchBooks} from './books'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {books: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('books', () => {
    it('eventually dispatches the GET BOOK action', () => {
      const fakeBook = [{title: 'Cody\'s Diary'}, {title: 'Jack\'s CookBook'}]
      mockAxios.onGet('/api/books').replyOnce(200, fakeBook)
      return store.dispatch(fetchBooks())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('GET_BOOKS')
          expect(actions[0].books).to.be.deep.equal(fakeBook)
        })
    })
  })

})
