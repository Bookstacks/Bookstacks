import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const ADD_REVIEW = 'ADD_REVIEW'


/**
 * INITIAL STATE
 */
const defaultReview = {}

/**
 * ACTION CREATORS
 */
const addReview = review => ({type: ADD_REVIEW, review})

/**
 * THUNK CREATORS
 */

export const postReview = (review) =>
  dispatch =>{
  axios.post(`/api/reviews/`, review)
  .then(res => 
    dispatch(addReview(res.data || defaultReview))
  )
}

/**
 * REDUCER
 */
export default function (state = defaultReview, action) {
  switch (action.type) {
    case ADD_REVIEW:
      return action.review
    default:
      return state
  }
}
