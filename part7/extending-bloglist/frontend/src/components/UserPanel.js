import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Typography, Box } from '@material-ui/core'

import { setNotification } from '../reducers/notificationReducer'
import { logout } from '../reducers/loginReducer'
import blogService from '../services/blogs'
import { useHistory } from 'react-router-dom'
const UserPanel = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector((state) => state.login)

  async function handleLogout() {
    dispatch(logout())
    blogService.setToken('')
    dispatch(
      setNotification({
        message: 'Successfully logged out',
        flag: 'success',
      })
    )
    history.push('/')
  }

  return (
    <Box display='flex' flexDirection='row-reverse'>
      <Typography>
        Current user: {user.username}
        <Button variant='outlined' type='button' onClick={handleLogout}>
          Logout
        </Button>
      </Typography>
    </Box>
  )
}

export default UserPanel
