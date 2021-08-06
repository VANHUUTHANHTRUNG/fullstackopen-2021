import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'

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

  async function handleLike(likedBlog) {
    const { author, title, url, id, user } = likedBlog // order matters, undo mongoose.populate in useEffect at the beginning
    const updatedBlog = {
      author,
      title,
      url,
      user: user.id || user,
      id,
      likes: likedBlog.likes + 1,
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
    <div style={blogStyle}>
      <div>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        <button onClick={() => setDetailView(!detailView)}>
          {detailView ? 'hide' : 'view'}
        </button>
      </div>
      <div style={showWhenDetail}>
        <p>
          <a href={blog.url}>{blog.url}</a>
        </p>
        <p data-testid='like'>
          likes : {blog.likes}
          <button type='button' onClick={() => handleLike(blog)}>
            like
          </button>
        </p>
        <p>posted here by {blog.user.username} </p>
        <button type='button' onClick={handleRemoveClicked}>
          remove
        </button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}
export default Blog
