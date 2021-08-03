import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleRemoveBlog }) => {
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

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
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
  handleLike: PropTypes.func.isRequired,
  handleRemoveBlog: PropTypes.func.isRequired,
}
export default Blog
