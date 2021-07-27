import { combineReducers, createStore } from 'redux'
import anecdote from './reducers/anecdoteReducer'
import notification from './reducers/notificationReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  anecdotes: anecdote,
  notification,
})

const store = createStore(reducer, composeWithDevTools())

export default store
