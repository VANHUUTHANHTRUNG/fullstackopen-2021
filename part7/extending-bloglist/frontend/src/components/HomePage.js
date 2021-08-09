import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'

import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blogs from './Blogs'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Box } from '@material-ui/core'

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
    <Box>
      <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
        <BlogForm handleFormSubmit={handleBlogFormSubmit} />
      </Togglable>
      <Blogs />
    </Box>
  )
}

export default HomePage
