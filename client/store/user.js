import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>{
    axios.get('/auth/me')
    .then(res => {
      const sessionId = localStorage.getItem('sessionId');
      const userId = localStorage.getItem('userId')
      if (res.data) dispatch(getUser(res.data) || defaultUser)//if authenticated user data exist
      else if (sessionId !== '' || userId !== '') dispatch(getUser({userId, sessionId}) || defaultUser)//if localStorage user data exist
      else  {// if both user data does not exist, create guest
         axios.post('auth/guest')
        .then(res => dispatch(getUser(res.data) || defaultUser))
        .catch(err => console.log(err)) 
      }
    })
    .catch(err => console.log(err)) 
  }

export const auth = (email, password, method) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password, guestUserId : localStorage.userId })
      .then(res => {
        dispatch(getUser(res.data))
        const guestUserId = localStorage.userId
        console.log('userId to delete : ', guestUserId)
        axios.delete((`/user/${guestUserId}`))
        localStorage.clear()
        history.push('/home')
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({error: authError}))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        localStorage.clear()
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
