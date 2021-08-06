import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

import Notification from './components/Notification'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import NavBar from './components/NavBar'
import UserView from './components/UserView'
import UsersView from './components/UsersView'
import BlogView from './components/BlogView'

import blogService from './services/blogs'
import { initBlogs } from './reducers/blogReducer'
import { initUsers } from './reducers/userReducer'
import { setLoggedUser } from './reducers/loginReducer'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.login)

  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initUsers())
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

  return (
    <div>
      <NavBar />
      <Notification />
      <Switch>
        <Route path='/blogs/:id' component={BlogView} />
        <Route path='/users/:id' component={UserView} />
        <Route path='/users' component={UsersView} />
        <Route path='/login' component={LoginPage} />
        <Route
          path='/'
          render={() => (user ? <HomePage /> : <Redirect to='/login' />)}
        />
      </Switch>
    </div>
  )
}

export default App
