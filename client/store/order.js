import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'


/**
 * INITIAL STATE
 */
const defaultOrders = []

/**
 * ACTION CREATORS
 */
const getOrders = orders => ({type: GET_ORDERS, orders})

/**
 * THUNK CREATORS
 */
export const fetchOrders = (userId) =>
  dispatch =>
    axios.get(`/api/order/${userId}`)
      .then(res =>
        dispatch(getOrders(res.data)))
      .catch(err => console.error(err))


/**
 * REDUCER
 */
export default function (state = defaultOrders, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    default:
      return state
  }
}
