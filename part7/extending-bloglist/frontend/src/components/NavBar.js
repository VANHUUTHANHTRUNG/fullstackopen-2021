import React from 'react'
import UserPanel from './UserPanel'

import { AppBar, Toolbar, IconButton, Button } from '@material-ui/core'

import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
const NavBar = () => {
  const user = useSelector((state) => state.login)
  return user ? (
    <AppBar position='static'>
      <Toolbar>
        <IconButton edge='start' color='inherit' aria-label='menu'></IconButton>
        <Button component={NavLink} to='/blogs'>
          Blogs
        </Button>
        <Button component={NavLink} to='/users'>
          Users
        </Button>
        <UserPanel />
      </Toolbar>
    </AppBar>
  ) : null
}

export default NavBar
