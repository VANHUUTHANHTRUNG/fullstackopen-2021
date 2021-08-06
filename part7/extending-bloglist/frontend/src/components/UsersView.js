import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UsersView = () => {
  const users = useSelector((state) => state.users)
  return (
    <div>
      <h1>Users</h1>
      <div>
        <span>Username</span>
        <span>Blogs created</span>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <Link to={`/users/${user.id}`}>
                <span>{user.username}</span>
              </Link>
              <span>{user?.blogs?.length}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default UsersView
