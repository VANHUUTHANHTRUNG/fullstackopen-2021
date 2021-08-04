import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, flag } = useSelector((state) => state.notification)
  const notificationStyle = {
    color: flag === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    textAlign: 'center',
  }

  if (message === null) {
    return null
  }

  return (
    <div data-testid={`${flag}-message`} style={notificationStyle}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
  flag: PropTypes.string,
}

Notification.defaultProps = {
  // remove .isRequired before set null as default
  message: null,
  flag: null,
}

export default Notification
