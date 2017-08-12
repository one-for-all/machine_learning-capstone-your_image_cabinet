import * as UserActionTypes from '../actiontypes/user'

export const logInUser = () => {
  return {
    type: UserActionTypes.LOGIN_USER
  }
}

export const logOutUser = () => {
  return {
    type: UserActionTypes.LOGOUT_USER
  }
}
