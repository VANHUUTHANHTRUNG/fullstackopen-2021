import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)
  const sortedBlogs = blogs.sort((first, second) =>
    first.likes < second.likes ? 1 : -1
  )
  return (
    <div>
      <h2>Blogs</h2>
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default Blogs
