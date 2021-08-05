import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit, username, password }) => {
  return (
    <div>
      <h2>Login form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Username
          <input data-testid='username' {...username} />
        </div>
        <div>
          Password
          <input data-testid='password' {...password} />
        </div>
        <button data-testid='submit-login-btn' type='submit'>
          Login
        </button>
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
