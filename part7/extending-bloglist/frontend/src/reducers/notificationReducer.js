const initialState = {
  message: null,
  flag: null,
}

let timeoutID = null

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      if (action.data.timeoutID) clearTimeout(action.data.timeoutID)
      return {
        message: action.data.message,
        flag: action.data.flag,
      }
    case 'CLEAR_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const setNotification = ({ message, flag, displayTime = 5000 }) => {
  return async (dispatch) => {
    if (timeoutID) clearNotification()
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message,
        flag,
      },
    })
    timeoutID = setTimeout(() => {
      dispatch(clearNotification())
    }, displayTime)
  }
}

export const clearNotification = () => {
  return { type: 'CLEAR_NOTIFICATION' }
}

export default notificationReducer
