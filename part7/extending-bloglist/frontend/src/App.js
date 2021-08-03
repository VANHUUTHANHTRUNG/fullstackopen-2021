import React, { useState, useEffect, useRef } from 'react'

import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UserPanel from './components/UserPanel'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    setTimeout(() => setErrorMessage(null), 10000)
  }, [errorMessage])

  useEffect(() => {
    setTimeout(() => setSuccessMessage(null), 10000)
  }, [successMessage])

  useEffect(() => {
    blogService.setToken(user === null ? null : user.token)
  }, [user])

  async function handleLogin(event) {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      setUser(user)
      setSuccessMessage(`${username} succeeds to login`)
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } finally {
      setUsername('')
      setPassword('')
    }
  }

  function handleLogout() {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    setSuccessMessage('Successfully logout')
  }

  async function handleBlogFormSubmit(newObject) {
    if (!user) return
    if (blogFormRef.current) blogFormRef.current.toggleVisibility()
    try {
      const addedBlog = await blogService.create(newObject)
      setBlogs(blogs.concat(addedBlog))
      setSuccessMessage(
        `Blog with title ${addedBlog.title} by ${addedBlog.author} successfully added`
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
        setErrorMessage('Updating permission denied')
      else {
        setErrorMessage('Unspecified cause for updating failure')
      }
    }
  }

  async function handleRemoveBlog(removeBlog) {
    try {
      const { id } = removeBlog
      await blogService.remove(id)
      const updatedBlogs = blogs.filter((blog) => blog.id !== id)
      setBlogs(updatedBlogs)
      setSuccessMessage(
        `Blog with title ${removeBlog.title} by ${removeBlog.author} successfully removed`
      )
    } catch (error) {
      if (error.response.status === 403)
        setErrorMessage('Deleting permission denied')
      else setErrorMessage('Unspecified cause for deleting failure')
    }
  }

  const content =
    user === null ? (
      <Togglable buttonLabel='Login'>
        <LoginForm
          handleSubmit={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password}
        />
      </Togglable>
    ) : (
      <div>
        <UserPanel username={user.username} handleLogout={handleLogout} />
        <Togglable buttonLabel='Create new blog'>
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
      <Notification message={errorMessage} flag='error' />
      <Notification message={successMessage} flag='success' />
      {content}
    </div>
  )
}

export default App
