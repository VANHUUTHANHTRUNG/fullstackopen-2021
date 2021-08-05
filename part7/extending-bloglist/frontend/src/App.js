import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import Notification from './components/Notification'
import UserPanel from './components/UserPanel'

import blogService from './services/blogs'
import { initBlogs } from './reducers/blogReducer'

import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import { setLoggedUser } from './reducers/loginReducer'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.login)

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const userParsed = JSON.parse(loggedUserJSON)
      dispatch(setLoggedUser(userParsed))
      blogService.setToken(userParsed.token)
    }
  }, [dispatch])

  useEffect(() => {
    blogService.setToken(user === null ? null : user.token)
  }, [user])

  const content =
    user === null ? (
      <LoginPage />
    ) : (
      <div>
        <UserPanel />
        <HomePage />
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
