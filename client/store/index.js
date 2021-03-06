import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import singleBook from './singleBook'
import books from './books'
import cart from './cart'
import order from './order'
import modal from './modal'
import reviews from './reviews'
import review from './review'

const reducer = combineReducers({user, books, singleBook, cart, order, reviews, review,  modal})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './singleBook'
export * from './books'
export * from './cart'
export * from './order'
export * from './modal'
export * from './reviews'
export * from './review'
