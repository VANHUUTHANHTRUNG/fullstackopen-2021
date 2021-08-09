import blogService from '../services/blogs'
import userService from '../services/users'
const initialState = []
let updatedState = []

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_BLOG':
      return [...state, action.data]
    case 'LIKE_BLOG':
      updatedState = state.map((blog) =>
        blog.id === action.data.id ? action.data : blog
      )
      return updatedState
    case 'COMMENT_BLOG':
      updatedState = state.map((blog) =>
        blog.id === action.data.id ? action.data : blog
      )
      return updatedState
    case 'REMOVE_BLOG':
      return state.filter((blog) => blog.id !== action.data.id)
    case 'INIT_BLOGS':
      return action.data
    default:
      return state
  }
}

export const createBlog = (newObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(newObject)
    dispatch({
      type: 'CREATE_BLOG',
      data: newBlog,
    })
  }
}

export const likeBlog = (object) => {
  const newObject = {
    ...object,
    user: object.user?.id || object.user,
    likes: object.likes + 1,
  }
  return async (dispatch) => {
    const updatedBlog = await blogService.update(newObject)
    const blogOwner = await userService.findById(newObject.user)
    const populatedUpdatedBlog = { ...updatedBlog, user: blogOwner }
    dispatch({
      type: 'LIKE_BLOG',
      data: populatedUpdatedBlog,
    })
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    try {
      const removedBlog = await blogService.remove(id)
      dispatch({
        type: 'REMOVE_BLOG',
        data: removedBlog,
      })
    } catch (error) {
      console.log('error from removeBlog')
      const newError = { ...error.toJSON(), statusCode: 403 }
      console.log(newError)
      throw new Error({ ...error.toJSON(), statusCode: 403 })
    }
  }
}

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const commentBlog = (object, content) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.comment(object.id, content)
      const blogOwner = await userService.findById(object.user.id)
      const populatedUpdatedBlog = { ...updatedBlog, user: blogOwner }
      dispatch({
        type: 'COMMENT_BLOG',
        data: populatedUpdatedBlog,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export default blogReducer
