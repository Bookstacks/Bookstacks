import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const UPDATE_CART = 'UPDATE_CART'

/**
 * INITIAL STATE
 */
const defaultCart = {}

/**
 * ACTION CREATORS
 */
const getCart = cart => ({type: GET_CART, cart})
const updateCart = cart => ({type: UPDATE_CART, cart})

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
      // fetchCart(userId)
      axios.get(`/api/cart/${userId}`)
      .then(res => dispatch(updateCart(res.data || defaultCart)))
  // })
      })
  }
      // .then(res =>
      //   dispatch(updateCart(res.data || defaultCart)))
      // .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case UPDATE_CART:
      return action.cart
    default:
      return state
  }
}
