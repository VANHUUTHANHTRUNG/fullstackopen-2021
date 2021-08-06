import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogView = () => {
  const blogs = useSelector((state) => state.blogs)
  const match = useRouteMatch('/blogs/:id')
  const dispatch = useDispatch()
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null
  async function handleLike(likedBlog) {
    const { author, title, url, id, user } = likedBlog // order matters, undo mongoose.populate in useEffect at the beginning
    const updatedBlog = {
      author,
      title,
      url,
      user: user.id || user,
      id,
      likes: likedBlog.likes + 1,
    }
    try {
      dispatch(likeBlog(updatedBlog))
    } catch (error) {
      if (error.response.status === 403)
        dispatch(
          setNotification({
            message: 'Updating permission denied',
            flag: 'error',
          })
        )
      else {
        dispatch(
          setNotification({
            message: 'Unspecified cause for updating failure',
            flag: 'error',
          })
        )
      }
    }
  }

  return blog ? (
    <div>
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      <p data-testid='like'>
        likes : {blog.likes}
        <button type='button' onClick={() => handleLike(blog)}>
          like
        </button>
      </p>
      <p>posted here by {blog.user.username} </p>
    </div>
  ) : null
}

export default BlogView
