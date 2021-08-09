import React from 'react'
import PropTypes from 'prop-types'
import { Box, TextField } from '@material-ui/core'

const BlogFormInput = ({ title, value, type, onChange, onReset }) => {
  return (
    <Box display='flex' alignItems='flex-start' p={1} m={1}>
      <Box p={1}>{title}</Box>
      <Box p={1}>
        <TextField
          data-testid={`${title.toLowerCase()}-input`}
          id={title.toLowerCase()}
          value={value}
          type={type}
          onChange={onChange}
          onReset={onReset}
        />
      </Box>
    </Box>
  )
}

BlogFormInput.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default BlogFormInput
