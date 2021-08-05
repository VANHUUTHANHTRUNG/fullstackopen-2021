import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { logout } from '../reducers/loginReducer'
import blogService from '../services/blogs'
const UserPanel = () => {
  const dispatch = useDispatch()
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
  }

  return (
    <div>
      <h2>User</h2>
      <p>Current user: {user.username}</p>
      <button type='button' onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default UserPanel
