import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'

import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blogs from './Blogs'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const HomePage = () => {
  const blogFormRef = useRef(null)
  const dispatch = useDispatch()

  async function handleBlogFormSubmit(newBlog) {
    try {
      if (blogFormRef.current) {
        blogFormRef.current.toggleVisibility()
      }
      dispatch(createBlog(newBlog))
      dispatch(
        setNotification({
          message: `Blog with title ${newBlog.title} by ${newBlog.author} successfully added`,
          flag: 'success',
        })
      )
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
        <BlogForm handleFormSubmit={handleBlogFormSubmit} />
      </Togglable>
      <Blogs />
    </div>
  )
}

export default HomePage
