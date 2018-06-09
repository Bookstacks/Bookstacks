// import axios from 'axios'
// import history from '../history'

// /**
//  * ACTION TYPES
//  */
// const UPDATE_LINE_ITEM = 'UPDATE_LINE_ITEM'
// /**
//  * INITIAL STATE
//  */
// const defaultLineItem = {}

// /**
//  * ACTION CREATORS
//  */
// const updateLineItem = lineItem => ({type: UPDATE_LINE_ITEM, lineItem})

// /**
//  * THUNK CREATORS
// //  */

// export const fetchUpdatedLineItem = (lineItemId) =>
//   dispatch =>
//     axios.put(`/api/cart/${lineItemId}`)
//       .then(res =>
//         dispatch(updateLineItem(res.data || defaultCart)))
//       .catch(err => console.log(err))

// /**
//  * REDUCER
//  */
// export default function (state = defaultLineItem, action) {
//   switch (action.type) {
//     case UPDATE_LINE_ITEM:
//       return action.lineItem
//     default:
//       return state
//   }
// }
