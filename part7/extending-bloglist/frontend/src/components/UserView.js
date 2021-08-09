import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Box, Table, TableCell, TableRow, Typography } from '@material-ui/core'
import { TableBody } from '@material-ui/core'

const UserView = () => {
  const users = useSelector((state) => state.users)
  const match = useRouteMatch('/users/:id')
  const user = match ? users.find((user) => user.id === match.params.id) : null
  return user ? (
    <div>
      <Typography variant='h4'>{user.username}</Typography>
      <Typography variant='h5'> Added blogs</Typography>
      {user.blogs.length === 0 ? (
        <p>No blog was addded</p>
      ) : (
        <Table>
          <TableBody>
            {user.blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Box component={Link} to={`/blogs/${blog.id}`}>
                    {blog.title}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  ) : null
}

export default UserView
