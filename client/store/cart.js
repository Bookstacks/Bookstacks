import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const UPDATE_CART = 'UPDATE_CART'
const DELETE_LINE_ITEM = 'DELETE_LINE_ITEM'
const ADD_LINE_ITEM = 'ADD_LINE_ITEM'

/**
 * INITIAL STATE
 */
const defaultCart = {}

/**
 * ACTION CREATORS
 */
const getCart = cart => ({type: GET_CART, cart})
const updateCart = cart => ({type: UPDATE_CART, cart})
const deleteLineItem = cart => ({type : DELETE_LINE_ITEM, cart})
const addLineItem = cart => ({type : ADD_LINE_ITEM, cart})
/**
 * THUNK CREATORS
 */
export const fetchCart = (userId) =>
  dispatch =>
    axios.get(`/api/cart/${userId}`)
      .then(res =>
        dispatch(getCart(res.data || defaultCart)))
      .catch(err => console.log(err))

export const fetchUpdatedLineItem = (lineItemId, userId, increment) =>
  dispatch =>{
    axios.put(`/api/cart/${lineItemId}`, {increment})
    .then(() => {
      axios.get(`/api/cart/${userId}`)
      .then(res => {
        dispatch(updateCart(res.data || defaultCart))})
    })
}

export const fetchDeletedLineItem = (lineItemId, userId, increment) =>
  dispatch =>{
    axios.delete(`/api/cart/${lineItemId}`, {increment})
    .then(() => {
      axios.get(`/api/cart/${userId}`)
      .then(res => dispatch(deleteLineItem(res.data || defaultCart)))
      })
  }

export const fetchAddedItem = (userId, bookId) =>
    dispatch =>{
      axios.post(`/api/cart/${userId}/${bookId}`)
      .then(res => 
        dispatch(addLineItem(res.data || defaultCart))
      )
    }


/**
 * REDUCER
 */
export default function (state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case UPDATE_CART:
      return action.cart
    case DELETE_LINE_ITEM:
      return action.cart  
    case ADD_LINE_ITEM : 
      return action.cart
    default:
      return state
  }
}
