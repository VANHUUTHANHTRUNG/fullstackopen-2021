import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { anecdoteCreate } from '../reducers/anecdoteReducer'
import { notifyCreate } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleAnecdoteSubmit = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(anecdoteCreate(content))
    dispatch(notifyCreate(content))
  }

  return (
    <form onSubmit={handleAnecdoteSubmit}>
      <div>
        <input type='text' name='anecdote' />
      </div>
      <button type='submit'>create</button>
    </form>
  )
}

export default AnecdoteForm
