import React from 'react'
import UserPanel from './UserPanel'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
const NavBar = () => {
  const user = useSelector((state) => state.login)
  return user ? (
    <div>
      <nav>
        <li>
          <NavLink to='/blogs'>blogs</NavLink>
        </li>
        <li>
          <NavLink to='/users'>users</NavLink>
        </li>
      </nav>
      <UserPanel />
    </div>
  ) : null
}

export default NavBar
