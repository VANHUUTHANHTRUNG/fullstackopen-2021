import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import Blogs from './components/Blogs'
import Notification from './components/Notification'
import UserPanel from './components/UserPanel'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import { logout } from './reducers/loginReducer'
import { setNotification } from './reducers/notificationReducer'

import LoginPage from './components/LoginPage'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const user = useSelector((state) => state.login)
  const blogFormRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.setToken(user === null ? null : user.token)
  }, [user])

  function handleLogout() {
    window.localStorage.removeItem('loggedBloglistUser')
    dispatch(logout())
    dispatch(
      setNotification({
        message: 'Successfully logged out',
        flag: 'success',
      })
    )
  }

  async function handleBlogFormSubmit(newObject) {
    if (!user) return
    try {
      if (blogFormRef.current) {
        blogFormRef.current.toggleVisibility()
      }
      const addedBlog = await blogService.create(newObject)
      setBlogs(blogs.concat(addedBlog))
      dispatch(
        setNotification({
          message: `Blog with title ${addedBlog.title} by ${addedBlog.author} successfully added`,
          flag: 'success',
        })
      )
    } catch (error) {
      console.log(error)
    }
  }

  async function handleLike(likedBlog) {
    const { author, title, url, id, user } = likedBlog // order matters, undo mongoose.populate in useEffect at the beginning
    const updatedBlog = {
      author,
      title,
      url,
      user: user.id,
      id,
      likes: likedBlog.likes + 1,
    }
    try {
      const result = await blogService.update(updatedBlog)
      //update blogs in client side
      const updatedBlogs = blogs.map((blog) =>
        result.id === blog.id ? { ...blog, likes: result.likes } : blog
      )
      setBlogs(updatedBlogs)
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

  async function handleRemoveBlog(removeBlog) {
    try {
      const { id } = removeBlog
      await blogService.remove(id)
      const updatedBlogs = blogs.filter((blog) => blog.id !== id)
      setBlogs(updatedBlogs)
      dispatch(
        setNotification({
          message: `Blog with title ${removeBlog.title} by ${removeBlog.author} successfully removed`,
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

  const content =
    user === null ? (
      <LoginPage />
    ) : (
      <div>
        <UserPanel username={user.username} handleLogout={handleLogout} />
        <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
          <BlogForm handleFormSubmit={handleBlogFormSubmit} />
        </Togglable>
        <Blogs
          blogs={blogs.sort((first, second) =>
            first.likes < second.likes ? 1 : -1
          )}
          handleLike={handleLike}
          handleRemoveBlog={handleRemoveBlog}
        />
      </div>
    )

  return (
    <div>
      <Notification />
      {content}
    </div>
  )
}

export default App
