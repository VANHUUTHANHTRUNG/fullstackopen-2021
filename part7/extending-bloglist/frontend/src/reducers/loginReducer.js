import loginService from '../services/login'

const loggedBloglistUser = JSON.parse(
  window.localStorage.getItem('loggedBloglistUser')
)

const initialState = loggedBloglistUser ? loggedBloglistUser : null

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const login = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login({ credentials })
    dispatch({
      type: 'LOGIN',
      data: user,
    })
  }
}

export const logout = () => {
  return { type: 'LOGOUT' }
}

export default loginReducer
