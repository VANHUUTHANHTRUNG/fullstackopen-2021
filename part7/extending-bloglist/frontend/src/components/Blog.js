import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { Box, Button, TableCell, TableRow } from '@material-ui/core'

import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
  const [detailView, setDetailView] = useState(false)

  const showWhenDetail = { display: detailView ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  async function handleRemoveClicked() {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
      await handleRemoveBlog(blog)
  }

  const dispatch = useDispatch()

  async function handleLike(event, likedBlog) {
    event.preventDefault()
    const updatedBlog = {
      ...likedBlog,
      user: likedBlog.user?.id || likedBlog.user,
    }
    try {
      dispatch(likeBlog(updatedBlog))
    } catch (error) {
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
  }

  async function handleRemoveBlog(removedBlog) {
    try {
      const { id } = removedBlog
      dispatch(removeBlog(id))
      dispatch(
        setNotification({
          message: `Blog with title ${removedBlog.title} by ${removedBlog.author} successfully removed`,
          flag: 'success',
        })
      )
    } catch (error) {
      if (error.response.status === 403)
        dispatch(
          setNotification({
            message: 'Deleting permission denied',
            flag: 'error',
          })
        )
      else
        dispatch(
          setNotification({
            message: 'Unspecified cause for deleting failure',
            flag: 'error',
          })
        )
    }
  }

  return (
    <TableRow style={blogStyle}>
      <TableCell>
        <Box>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          <Button
            style={{ float: 'right' }}
            variant='contained'
            color='inherit'
            onClick={() => setDetailView(!detailView)}
          >
            {detailView ? 'hide' : 'quick view'}
          </Button>
        </Box>
        <Box style={showWhenDetail}>
          <p>
            <a href={blog.url}>{blog.url}</a>
          </p>
          <p data-testid='like'>
            likes : {blog.likes}
            <Button
              variant='contained'
              color='inherit'
              type='button'
              onClick={(event) => handleLike(event, blog)}
            >
              like
            </Button>
          </p>
          <p>posted here by {blog.user?.username} </p>
          <Button
            variant='contained'
            color='inherit'
            type='button'
            onClick={handleRemoveClicked}
          >
            remove
          </Button>
        </Box>
      </TableCell>
    </TableRow>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}
export default Blog
