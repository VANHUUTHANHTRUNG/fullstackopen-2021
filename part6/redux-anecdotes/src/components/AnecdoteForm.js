import React from 'react'
import { connect } from 'react-redux'
import { anecdoteCreate } from '../reducers/anecdoteReducer'
import { notifyCreate } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const handleAnecdoteSubmit = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.anecdoteCreate(content)
    props.notifyCreate(content)
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

const mapDispatchToProps = {
  anecdoteCreate,
  notifyCreate,
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
