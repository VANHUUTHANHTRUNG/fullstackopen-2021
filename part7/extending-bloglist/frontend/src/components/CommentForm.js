import React from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { commentBlog } from '../reducers/blogReducer'
import { useField } from '../hooks'
const CommentForm = ({ blog }) => {
  const comment = useField('text')
  const dispatch = useDispatch()
  async function handleError(error) {
    if (error.response.status === 403)
      dispatch(
        setNotification({
          message: 'Updating permission denied',
          flag: 'error',
        })
      )
    else {
      dispatch(
        setNotification({
          message: 'Unspecified cause for updating failure',
          flag: 'error',
        })
      )
    }
  }

  async function handleComment(event) {
    event.preventDefault()
    try {
      dispatch(commentBlog(blog, comment.value))
      comment.onReset()
    } catch (error) {
      handleError(error)
    }
  }
  return (
    <div>
      <h3>Comment form</h3>
      <form onSubmit={handleComment}>
        <div>
          <button data-testid='submit-login-btn' type='submit'>
            Add comment
          </button>
          <input data-testid='comment' {...comment} />
        </div>
      </form>
    </div>
  )
}

export default CommentForm
