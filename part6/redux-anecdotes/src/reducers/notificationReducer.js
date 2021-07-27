const initialState = ''

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFY_VOTE':
      return `Voted for '${action.data.content}'`
    case 'NOTIFY_CREATE':
      return `Created '${action.data.content}'`
    default:
      return state
  }
}

export const notifyVote = (content) => {
  return {
    type: 'NOTIFY_VOTE',
    data: { content },
  }
}

export const notifyCreate = (content) => {
  return {
    type: 'NOTIFY_CREATE',
    data: { content },
  }
}

export default reducer
