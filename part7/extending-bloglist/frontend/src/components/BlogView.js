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
  async function handleLike() {
    const { comments, author, title, url, id } = blog // order matters -> solution: use lodash to compare object in backend
    const updatedBlog = {
      comments,
      author,
      title,
      url,
      user: blog.user?.id || blog.user,
      id,
      likes: blog.likes + 1,
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
        <button type='button' onClick={handleLike}>
          like
        </button>
      </p>
      <p>posted here by {blog.user.username} </p>
      <h2>comments</h2>
      {blog.comments?.length === 0 ? (
        <p>Be the first to comment!</p>
      ) : (
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment.id}>{comment.content}</li>
          ))}
        </ul>
      )}
    </div>
  ) : null
}

export default BlogView
