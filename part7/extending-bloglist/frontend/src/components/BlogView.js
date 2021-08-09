import React from 'react'
import CommentForm from './CommentForm'

import { useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@material-ui/core'

const BlogView = () => {
  const blogs = useSelector((state) => state.blogs)
  const match = useRouteMatch('/blogs/:id')
  const dispatch = useDispatch()
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null
  function handleError(error) {
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

  async function handleLike() {
    try {
      dispatch(likeBlog(blog))
    } catch (error) {
      handleError(error)
    }
  }

  return blog ? (
    <div>
      <Typography variant='h3' color='inherit'>
        {blog.title}
      </Typography>
      <a href={blog.url}>{blog.url}</a>
      <Typography data-testid='like'>
        likes : {blog.likes}
        <Button variant='outlined' type='button' onClick={handleLike}>
          like
        </Button>
      </Typography>
      <Typography>posted here by {blog.user.username} </Typography>
      <CommentForm blog={blog} />
      {blog.comments?.length === 0 ? (
        <Typography>Be the first to comment!</Typography>
      ) : (
        <Table>
          <TableBody>
            {blog.comments.map((comment) => (
              <TableRow key={comment.id}>
                <TableCell>{comment.content}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  ) : null
}

export default BlogView
