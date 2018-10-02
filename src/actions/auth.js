export const loginUser = (token) => {
  return {
    type: 'AUTH_LOGIN',
    token
  }
}

export const logoutUser = () => {
  return {
    type: 'AUTH_LOGOUT'
  }
}