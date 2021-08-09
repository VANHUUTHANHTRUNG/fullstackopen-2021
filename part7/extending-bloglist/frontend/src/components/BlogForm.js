import React from 'react'
import PropTypes from 'prop-types'

import { Button, Typography } from '@material-ui/core'

import BlogFormInput from './BlogFormInput'
import { useField } from '../hooks'
const BlogForm = ({ handleFormSubmit }) => {
  const author = useField('text')
  const title = useField('text')
  const url = useField('text')

  function resetForm() {
    author.onReset()
    title.onReset()
    url.onReset()
  }

  async function onSubmit(event) {
    event.preventDefault()
    const newObject = {
      author: author.value,
      title: title.value,
      url: url.value,
    }
    await handleFormSubmit(newObject)
    resetForm()
  }

  return (
    <div>
      <Typography variant='h4'>Create new</Typography>
      <form id='blog-form' onSubmit={onSubmit}>
        <BlogFormInput title='Author' {...author} />
        <BlogFormInput title='Title' {...title} />
        <BlogFormInput title='Url' {...url} />
        <Button
          variant='contained'
          color='primary'
          data-testid='submit-create-btn'
          type='submit'
        >
          Create
        </Button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
}

export default BlogForm
