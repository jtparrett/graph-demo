import jwtDecode from 'jwt-decode'

export default (state = {}, {type, token}) => {

  if(type === 'AUTH_LOGIN'){
    return {
      token,
      ...jwtDecode(token)
    }
  }

  if(type === 'AUTH_LOGOUT'){
    return {}
  }

  return state
}