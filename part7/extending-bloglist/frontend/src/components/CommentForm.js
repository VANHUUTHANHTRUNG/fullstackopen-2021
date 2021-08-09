import React from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { commentBlog } from '../reducers/blogReducer'
import { useField } from '../hooks'
import { Button, TextField } from '@material-ui/core'
import { Typography } from '@material-ui/core'
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
      <Typography color='inherit' variant='h4'>
        Comments
      </Typography>
      <form onSubmit={handleComment}>
        <div>
          <Button
            variant='outlined'
            data-testid='submit-login-btn'
            type='submit'
          >
            Add comment
          </Button>
          <TextField data-testid='comment' {...comment} />
        </div>
      </form>
    </div>
  )
}

export default CommentForm
