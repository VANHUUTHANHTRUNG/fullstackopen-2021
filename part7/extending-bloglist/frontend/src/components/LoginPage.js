import React from 'react'
import { useDispatch } from 'react-redux'

import { setNotification } from '../reducers/notificationReducer'
import Togglable from './Togglable'
import LoginForm from './LoginForm'
import { login } from '../reducers/loginReducer'
import { useField } from '../hooks'

const LoginPage = () => {
  const dispatch = useDispatch()
  const username = useField('text')
  const password = useField('password')

  async function handleLogin(event) {
    event.preventDefault()
    if (
      !username.value ||
      !password.value ||
      username.value === '' ||
      password.value === ''
    ) {
      dispatch(
        setNotification({
          message: 'Empty credentials',
          flag: 'error',
        })
      )
      return
    }
    try {
      dispatch(
        login({
          username: username.value,
          password: password.value,
        })
      )
      dispatch(
        setNotification({
          message: `${username.value} succeeds to login`,
          flag: 'success',
        })
      )
    } catch (error) {
      console.log('Login page error', error)
      dispatch(
        setNotification({
          message: 'Wrong credentials',
          flag: 'error',
        })
      )
    }
  }
  return (
    <div>
      <h2>Login page</h2>
      <Togglable buttonLabel='Login'>
        <LoginForm
          handleSubmit={handleLogin}
          username={username}
          password={password}
        />
      </Togglable>
    </div>
  )
}

export default LoginPage
