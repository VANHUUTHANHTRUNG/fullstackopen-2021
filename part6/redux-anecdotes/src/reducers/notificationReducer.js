const initialState = ''
let timeoutID = undefined

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFY_VOTE':
      return `Voted for '${action.data.content}'`
    case 'NOTIFY_CREATE':
      return `Created '${action.data.content}'`
    case 'CLEAR_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const notifyVote = (content, displayTime = 5000) => {
  return async (dispatch) => {
    if (timeoutID) clearTimeout(timeoutID)
    dispatch({
      type: 'NOTIFY_VOTE',
      data: { content },
    })
    timeoutID = setTimeout(() => {
      dispatch(clearNotification())
    }, displayTime)
  }
}

export const notifyCreate = (content, displayTime = 5000) => {
  return async (dispatch) => {
    if (timeoutID) clearTimeout(timeoutID)
    dispatch({
      type: 'NOTIFY_CREATE',
      data: { content },
    })
    timeoutID = setTimeout(() => {
      dispatch(clearNotification())
    }, displayTime)
  }
}

export const clearNotification = () => {
  return { type: 'CLEAR_NOTIFICATION' }
}

export default reducer
