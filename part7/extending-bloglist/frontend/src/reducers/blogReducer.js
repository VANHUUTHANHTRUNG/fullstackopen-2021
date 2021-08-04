import blogService from '../services/blogs'

const initialState = []

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_BLOG':
      return [...state, action.data]
    case 'LIKE_BLOG':
      return state.map((blog) =>
        blog.id === action.data.id ? action.data : blog
      )
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

export const likeBlog = (newObject) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(newObject)
    dispatch({
      type: 'LIKE_BLOG',
      data: updatedBlog,
    })
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    const removedBlog = await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: removedBlog,
    })
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

export default blogReducer
