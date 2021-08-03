import React from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'

const Blogs = ({ blogs, handleLike, handleRemoveBlog }) => {
  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemoveBlog={handleRemoveBlog}
        />
      ))}
    </div>
  )
}

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemoveBlog: PropTypes.func.isRequired,
}

export default Blogs
