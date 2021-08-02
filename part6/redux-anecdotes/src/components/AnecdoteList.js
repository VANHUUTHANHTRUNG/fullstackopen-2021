import React from 'react'
import { connect } from 'react-redux'
import { voteAdd } from '../reducers/anecdoteReducer'
import { notifyVote } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes
  const sortedAnecdotes = anecdotes
    .filter((anecdote) => anecdote.content.toLowerCase().includes(props.filter))
    .sort((current, next) => next.votes - current.votes)
  const vote = (anecdote) => {
    props.voteAdd(anecdote)
    props.notifyVote(anecdote.content)
  }

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = (state) => {
  return { anecdotes: state.anecdotes, filter: state.filter }
}

const mapDispatchToProps = {
  voteAdd,
  notifyVote,
}
export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
