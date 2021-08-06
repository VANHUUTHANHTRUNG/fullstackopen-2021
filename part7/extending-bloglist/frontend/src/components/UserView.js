import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserView = () => {
  const users = useSelector((state) => state.users)
  const match = useRouteMatch('/users/:id')
  const user = match ? users.find((user) => user.id === match.params.id) : null
  return user ? (
    <div>
      <h1>{user.username}</h1>
      <h2> Added blogs</h2>
      {user.blogs.length === 0 ? (
        <p>No blog was addded</p>
      ) : (
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      )}
    </div>
  ) : null
}

export default UserView
