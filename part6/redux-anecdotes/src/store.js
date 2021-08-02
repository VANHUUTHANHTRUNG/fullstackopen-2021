import { combineReducers, createStore, applyMiddleware } from 'redux'
import anecdote from './reducers/anecdoteReducer'
import notification from './reducers/notificationReducer'
import filter from './reducers/filterReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  anecdotes: anecdote,
  notification,
  filter,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
