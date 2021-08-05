import blogService from '../services/blogs'
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
    case 'SET_LOGGED_USER':
      return action.data
    default:
      return state
  }
}

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const loggedUser = await loginService.login(credentials)
      if (loggedUser) {
        window.localStorage.setItem(
          'loggedBloglistUser',
          JSON.stringify(loggedUser)
        )
        blogService.setToken(loggedUser.token)
      }
      dispatch({
        type: 'LOGIN',
        data: loggedUser,
      })
    } catch (error) {
      console.log(error)
    }
  }
}
export const setLoggedUser = (loggedUser) => {
  return async (dispatch) => {
    window.localStorage.setItem(
      'loggedBloglistUser',
      JSON.stringify(loggedUser)
    )
    dispatch({
      type: 'SET_LOGGED_USER',
      data: loggedUser,
    })
  }
}

export const logout = () => {
  return { type: 'LOGOUT' }
}

export default loginReducer
