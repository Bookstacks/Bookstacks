import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SHOW_MODAL = 'SHOW_MODAL'


/**
 * INITIAL STATE
 */
const defaultModal = false;

/**
 * ACTION CREATORS
 */
export const showModal = bool => ({type: SHOW_MODAL, bool})

/**
 * THUNK CREATORS
 */
export const toggleModal = (bool) => dispatch => dispatch(showModal(!bool))

/**
 * REDUCER
 */
export default function (state = defaultModal, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return action.bool
    default:
      return state
  }
}
