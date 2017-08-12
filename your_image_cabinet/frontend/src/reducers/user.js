import * as UserActionTypes from '../actiontypes/user'

const initialState = {
  loggedIn: false
}

function UserReducer(state=initialState, action) {
  switch (action.type) {
    case UserActionTypes.LOGIN_USER:
      sessionStorage.setItem('userLoggedIn', 'true')
      return {
        loggedIn: true
      }
    case UserActionTypes.LOGOUT_USER:
      sessionStorage.setItem('userLoggedIn', 'false')
      return {
        loggedIn: false
      }
    default:
      return state
  }
}

export default UserReducer
