import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_SINGLE_BOOK = 'GET_SINGLE_BOOK'

/**
 * INITIAL STATE
 */
const defaultBook = {}

/**
 * ACTION CREATORS
 */
const getBook = book => ({type: GET_SINGLE_BOOK, book})

/**
 * THUNK CREATORS
 */
export const fetchBook = (id) =>
  dispatch =>
    axios.get(`/api/books/${id}`)
      .then(res =>
        dispatch(getBook(res.data || defaultBook)))
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultBook, action) {
  switch (action.type) {
    case GET_SINGLE_BOOK:
      return action.book
    default:
      return state
  }
}
