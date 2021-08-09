import React from 'react'
import PropTypes from 'prop-types'
import { TextField, Button } from '@material-ui/core'
const LoginForm = ({ handleSubmit, username, password }) => {
  return (
    <div>
      <h2>Login form</h2>
      <form onSubmit={handleSubmit}>
        <TextField label='Username' data-testid='username' {...username} />
        <TextField
          label='Password'
          type='password'
          data-testid='password'
          {...password}
        />
        <Button
          variant='contained'
          color='primary'
          data-testid='submit-login-btn'
          type='submit'
        >
          Login
        </Button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired,
}
export default LoginForm
