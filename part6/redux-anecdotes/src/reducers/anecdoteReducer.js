import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE_ADD':
      const votedAnecdote = action.data
      const anecdoteToChange = state.find((n) => n.id === votedAnecdote.id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      }
      return state.map((anecdote) =>
        anecdote.id === votedAnecdote.id ? changedAnecdote : anecdote
      )

    case 'ANECDOTE_CREATE':
      return [...state, action.data]

    case 'ANECDOTES_INIT':
      return action.data

    default:
      return state
  }
}

export const voteAdd = (anecdote) => {
  return async (dispatch) => {
    const toUpdateAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }
    const updatedAnecdote = await anecdoteService.update(toUpdateAnecdote)
    dispatch({
      type: 'VOTE_ADD',
      data: updatedAnecdote,
    })
  }
}

export const anecdoteCreate = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ANECDOTE_CREATE',
      data: newAnecdote,
    })
  }
}

export const anecdotesInitialize = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'ANECDOTES_INIT',
      data: anecdotes,
    })
  }
}

export default reducer
