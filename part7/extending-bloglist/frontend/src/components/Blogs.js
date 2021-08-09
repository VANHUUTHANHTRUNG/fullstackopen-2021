import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'
import {
  TableContainer,
  Table,
  TableBody,
  Paper,
  Box,
  Typography,
} from '@material-ui/core'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)
  const sortedBlogs = blogs.sort((first, second) =>
    first.likes < second.likes ? 1 : -1
  )
  return (
    <Box>
      <Typography variant='h3'>Blogs</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {sortedBlogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Blogs
