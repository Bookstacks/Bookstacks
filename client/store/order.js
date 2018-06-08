import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ORDER = 'GET_ORDER'


/**
 * INITIAL STATE
 */
const defaultOrder = {}

/**
 * ACTION CREATORS
 */
const getOrder = order => ({type: GET_ORDER, order})

/**
 * THUNK CREATORS
 */
export const fetchOrder = (id) =>
  dispatch =>
    axios.get(`/api/order/${id}`)
      .then(res =>
        dispatch(getOrder(res.data)))
      .catch(err => console.error(err))


/**
 * REDUCER
 */
export default function (state = defaultOrder, action) {
  switch (action.type) {
    case GET_ORDER:
      return action.order
    default:
      return state
  }
}