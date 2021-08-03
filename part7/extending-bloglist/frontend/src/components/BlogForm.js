import React, { useState } from 'react'
import PropTypes from 'prop-types'
import BlogFormInput from './BlogFormInput'

const BlogForm = ({ handleFormSubmit }) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  function resetForm() {
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  async function onSubmit(event) {
    event.preventDefault()
    const newObject = { author, title, url }
    await handleFormSubmit(newObject)
    resetForm()
  }

  return (
    <div>
      <h2>Create new</h2>
      <form id='blog-form' onSubmit={onSubmit}>
        <BlogFormInput
          title='Author'
          value={author}
          handleInputChange={({ target }) => setAuthor(target.value)}
        />
        <BlogFormInput
          title='Title'
          value={title}
          handleInputChange={({ target }) => setTitle(target.value)}
        />
        <BlogFormInput
          title='Url'
          value={url}
          handleInputChange={({ target }) => setUrl(target.value)}
        />
        <button data-testid='submit-create-btn' type='submit'>
          Create
        </button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
}

export default BlogForm
