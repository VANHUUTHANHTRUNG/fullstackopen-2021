const initialState = ''

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFY_VOTE':
      return `Voted for '${action.data.content}'`
    case 'NOTIFY_CREATE':
      return `Created '${action.data.content}'`
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const notifyVote = (content, displayTime = 5000) => {
  return async (dispatch) => {
    dispatch({
      type: 'NOTIFY_VOTE',
      data: { content },
    })
    setTimeout(() => {
      dispatch(clearNotification())
    }, displayTime)
  }
}

export const notifyCreate = (content, displayTime = 5000) => {
  return async (dispatch) => {
    dispatch({
      type: 'NOTIFY_CREATE',
      data: { content },
    })
    setTimeout(() => {
      dispatch(clearNotification())
    }, displayTime)
  }
}

export const clearNotification = () => {
  return { type: 'CLEAR_NOTIFICATION' }
}

export default reducer
