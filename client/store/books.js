import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_BOOKS = 'GET_BOOKS'


/**
 * INITIAL STATE
 */
const defaultBooks = []

/**
 * ACTION CREATORS
 */
const getBooks = books => ({type: GET_BOOKS, books})

/**
 * THUNK CREATORS
 */
export const fetchBooks = () =>
  dispatch =>
    axios.get('/api/books')
      .then(res =>
        dispatch(getBooks(res.data || defaultBooks)))
      .catch(err => console.log(err))


/**
 * REDUCER
 */
export default function (state = defaultBooks, action) {
  switch (action.type) {
    case GET_BOOKS:
      return action.books
    default:
      return state
  }
}
