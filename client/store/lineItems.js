/**
 * INITIAL STATE
 */
const defaultState = {
  cart : {},
  lineItem: {},
}

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

export const fetchUpdatedLineItem = (lineItemId) =>
  dispatch =>
    axios.put(`/api/cart/${lineItemId}`)
      .then(res =>
        {console.log(res.data)
        dispatch(updateCart(res.data || defaultCart))})
      .catch(err => console.log(err))


/**
 * REDUCER
 */
export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case UPDATE_CART:
      return action.cart
    default:
      return state
  }
}
