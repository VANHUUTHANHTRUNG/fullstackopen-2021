import React from 'react'
import PropTypes from 'prop-types'

const UserPanel = ({ username, handleLogout }) => {
  return (
    <div>
      <h2>User</h2>
      <p>Current user: {username}</p>
      <button type='button' onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

UserPanel.propTypes = {
  username: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
}

export default UserPanel
